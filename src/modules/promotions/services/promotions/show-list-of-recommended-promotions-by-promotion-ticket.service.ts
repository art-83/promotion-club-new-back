import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
import PromotionTicket from "../../../tickets/infra/orm/entities/promotion-ticket.entity";
import PromotionTicketQueryOptionsDTO from "../../../tickets/dtos/promotion-ticket-query-options.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";
import PromotionTagQueryOptionsDTO from "../../dtos/promotion-tag/promotion-tag-query-options.dto";
import PromotionTag from "../../infra/orm/entities/promotion-tag.entity";
import PromotionRepositoryProvider from "../../infra/orm/repositories/providers/promotions-repository.providers";

@injectable()
class ShowListOfRecommendedPromotionsByPromotionTicketService {
  private readonly RECOMMENDATION_COUNT = 3;
  private readonly MARKOV_TEMPERATURE = 1.8;
  private readonly EXPLORATION_RATE = 0.25;
  private readonly MAX_TAGS_FOR_CANDIDATES = 15;
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: PromotionRepositoryProvider,
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: RepositoryProvider<PromotionTicket>,
    @inject("PromotionTagRepository")
    private promotionTagRepository: RepositoryProvider<PromotionTag>
  ) {}

  public async execute(user_id: string, promotion_ticket_id: string): Promise<Promotion[]> {
    const promotionTagsQueryOptions = {
      user_id,
    } as Partial<PromotionTagQueryOptionsDTO>;

    const userPromotionTags = await this.promotionTagRepository.find(promotionTagsQueryOptions);

    if (!userPromotionTags.length) throw new AppError(404, "User promotion tags not found");

    const userTagWeights = new Map<string, number>();
    for (const promotionTag of userPromotionTags) {
      const tagId = promotionTag.tag?.id;
      if (!tagId) continue;
      userTagWeights.set(tagId, (userTagWeights.get(tagId) ?? 0) + 1);
    }

    const sortedTagIds = Array.from(userTagWeights.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id)
      .slice(0, this.MAX_TAGS_FOR_CANDIDATES);

    if (!sortedTagIds.length) throw new AppError(404, "No tag distribution for user");

    const promotionTicketQueryOptions = {
      id: promotion_ticket_id,
      join_promotion_tags: true,
    } as Partial<PromotionTicketQueryOptionsDTO>;

    const promotionTicket = (
      await this.promotionTicketRepository.find(promotionTicketQueryOptions)
    ).at(0);

    if (!promotionTicket) throw new AppError(404, "Promotion ticket not found");

    const currentPromotionId = promotionTicket.promotion.id;

    const candidatePromotions = await this.promotionRepository.findMostRelevantPromotionsByTags(
      currentPromotionId,
      sortedTagIds
    );

    const uniqueById = new Map<string, Promotion>();
    for (const p of candidatePromotions) uniqueById.set(p.id, p);
    const candidates = Array.from(uniqueById.values());

    if (!candidates.length) throw new AppError(404, "No recommended promotions found");

    const totalTagWeight = Array.from(userTagWeights.values()).reduce((a, b) => a + b, 0);
    const tagProbability = new Map<string, number>();
    for (const [tagId, w] of userTagWeights) {
      tagProbability.set(tagId, w / totalTagWeight);
    }

    const getRawWeight = (p: Promotion): number => {
      const tagIds = (p.promotion_tags ?? [])
        .map((pt) => pt.tag?.id)
        .filter((id): id is string => Boolean(id));
      return tagIds.reduce((sum, tagId) => sum + (tagProbability.get(tagId) ?? 0), 0);
    };

    const applyTemperature = (weight: number, temperature: number): number => {
      if (temperature <= 0) return weight;
      return Math.pow(Math.max(weight, 1e-10), 1 / temperature);
    };

    const mixWithUniform = (
      weight: number,
      exploration: number,
      totalItems: number
    ): number => {
      const uniform = 1 / Math.max(totalItems, 1);
      return (1 - exploration) * weight + exploration * uniform;
    };

    const getWeight = (p: Promotion): number => {
      const raw = getRawWeight(p);
      const withTemp = applyTemperature(raw, this.MARKOV_TEMPERATURE);
      return mixWithUniform(withTemp, this.EXPLORATION_RATE, candidates.length);
    };

    const weightedSampleWithoutReplacement = (
      items: Promotion[],
      getItemWeight: (p: Promotion) => number,
      k: number
    ): Promotion[] => {
      if (items.length === 0 || k <= 0) return [];
      const n = Math.min(k, items.length);
      const remaining = items.map((item) => ({ item, weight: getItemWeight(item) }));
      const result: Promotion[] = [];

      for (let i = 0; i < n; i++) {
        const total = remaining.reduce((sum, { weight }) => sum + weight, 0);
        if (total <= 0) break;
        let r = Math.random() * total;
        let idx = 0;
        for (let j = 0; j < remaining.length; j++) {
          const entry = remaining[j];
          if (entry) r -= entry.weight;
          if (r <= 0) {
            idx = j;
            break;
          }
          idx = j;
        }
        const chosen = remaining[idx];
        if (chosen) {
          result.push(chosen.item);
          remaining.splice(idx, 1);
        }
      }

      return result;
    };

    const recommended = weightedSampleWithoutReplacement(
      candidates,
      getWeight,
      this.RECOMMENDATION_COUNT
    );

    return recommended;
  }
}

export default ShowListOfRecommendedPromotionsByPromotionTicketService;
