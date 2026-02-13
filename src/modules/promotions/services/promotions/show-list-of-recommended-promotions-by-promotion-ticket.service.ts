import { inject, injectable } from "tsyringe";
import Promotion from "../../infra/orm/entities/promotion.entity";
import PromotionTicket from "../../../tickets/infra/orm/entities/promotion-ticket.entity";
import PromotionRepositoryProvider from "../../infra/orm/repositories/providers/promotions-repository.providers";
import PromotionTicketRepositoryProvider from "../../../tickets/infra/orm/repositories/providers/promotion-ticket-repository.provider";
import PromotionQueryOptionsDTO from "../../dtos/promotions/promotion-query-options.dto";

@injectable()
class ShowListOfRecommendedPromotionsByUser {
  private readonly RECOMMENDATION_LIMIT = 20;
  private readonly TICKET_FETCH_LIMIT = 200;
  private readonly WEIGHTED_TAG_SELECTION_COUNT = 5;
  private readonly EXCLUDE_PROMOTION_ID_PLACEHOLDER = "00000000-0000-0000-0000-000000000000";
  constructor(
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: PromotionTicketRepositoryProvider,
    @inject("PromotionRepository")
    private promotionRepository: PromotionRepositoryProvider
  ) {}

  public async execute(user_id: string): Promise<Promotion[]> {
    const tickets = await this.getUserTicketsWithTags(user_id);

    if (!tickets.length) {
      return this.getColdStartPromotions(); 
    }

    const tagFrequency = this.extractTagFrequencyFromTickets(tickets);

    if (!tagFrequency.size) {
      return this.getColdStartPromotions();
    }

    const selectedTagIds = this.weightedRandomTagSelection(tagFrequency, this.WEIGHTED_TAG_SELECTION_COUNT);

    if (!selectedTagIds.length) {
      return this.getColdStartPromotions();
    }

    let promotions = await this.getPromotionsByTags(selectedTagIds);

    const userPromotionIds = new Set(tickets.map((t) => t.promotion?.id).filter(Boolean) as string[]);
    promotions = this.excludeUserPromotions(promotions, userPromotionIds);
 
    if (!promotions.length) {
      return this.getColdStartPromotions();
    }

    promotions = this.deduplicatePromotions(promotions);
    promotions = this.filterApprovedAndNotExpired(promotions);

    const scores = this.scorePromotionsByTagOverlap(promotions, tagFrequency);
    return this.sortByEngagementScore(promotions, scores);
  }

  private async getUserTicketsWithTags(user_id: string): Promise<PromotionTicket[]> {
    return this.promotionTicketRepository.find({
      user_id,
      join_promotion_tags: true,
      limit: this.TICKET_FETCH_LIMIT,
    });
  }

  private extractTagFrequencyFromTickets(tickets: PromotionTicket[]): Map<string, number> {
    const frequency = new Map<string, number>();

    for (const ticket of tickets) {
      const promotion = ticket.promotion;
      if (!promotion?.promotion_tags) continue;

      for (const pt of promotion.promotion_tags) {
        const tag = pt.tag;
        if (!tag?.id) continue;

        const tagId = String(tag.id);
        frequency.set(tagId, (frequency.get(tagId) ?? 0) + 1);
      }
    }

    return frequency;
  }

  private weightedRandomTagSelection(tagFrequency: Map<string, number>, count: number): string[] {
    const entries = Array.from(tagFrequency.entries());
    if (!entries.length) return [];

    const totalWeight = entries.reduce((sum, [, w]) => sum + w, 0);
    if (totalWeight <= 0) return [];

    const selected: string[] = [];
    const remaining = [...entries];

    for (let i = 0; i < count && remaining.length > 0; i++) {
      let r = Math.random() * remaining.reduce((s, [, w]) => s + w, 0);

      for (let j = 0; j < remaining.length; j++) {
        const entry = remaining[j];
        if (!entry) continue;
        r -= entry[1];
        if (r <= 0) {
          selected.push(entry[0]);
          remaining.splice(j, 1);
          break;
        }
      }
    }

    return selected;
  }

  private async getPromotionsByTags(tagIds: string[]): Promise<Promotion[]> {
    return this.promotionRepository.findMostRelevantPromotionsByTags(
      this.EXCLUDE_PROMOTION_ID_PLACEHOLDER,
      tagIds
    );
  }

  private excludeUserPromotions(promotions: Promotion[], userPromotionIds: Set<string>): Promotion[] {
    return promotions.filter((p) => !userPromotionIds.has(p.id));
  }

  private filterApprovedAndNotExpired(promotions: Promotion[]): Promotion[] {
    const now = new Date();
    return promotions.filter((p) => p.is_approved === true && new Date(p.expire_at) > now);
  }

  private deduplicatePromotions(promotions: Promotion[]): Promotion[] {
    const seen = new Set<string>();
    return promotions.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }

  private scorePromotionsByTagOverlap(
    promotions: Promotion[],
    tagWeights: Map<string, number>
  ): Map<string, number> {
    const scores = new Map<string, number>();

    for (const promotion of promotions) {
      let score = 0;

      if (promotion.promotion_tags) {
        for (const pt of promotion.promotion_tags) {
          const tag = pt.tag;
          if (tag?.id) {
            score += tagWeights.get(String(tag.id)) ?? 0;
          }
        }
      }

      scores.set(promotion.id, score);
    }

    return scores;
  }

  private sortByEngagementScore(promotions: Promotion[], scores: Map<string, number>): Promotion[] {
    return [...promotions].sort((a, b) => {
      const scoreA = scores.get(a.id) ?? 0;
      const scoreB = scores.get(b.id) ?? 0;

      if (scoreB !== scoreA) return scoreB - scoreA;

      return Math.random() - 0.5;
    }).slice(0, this.RECOMMENDATION_LIMIT);
  }

  private async getColdStartPromotions(): Promise<Promotion[]> {
    const options: Partial<PromotionQueryOptionsDTO> = {
      is_approved: true,
      limit: this.RECOMMENDATION_LIMIT,
      join_store: true,
      join_image: true,
    };
    const promotions = await this.promotionRepository.find(options);

    return this.filterApprovedAndNotExpired(promotions);
  }
}

export default ShowListOfRecommendedPromotionsByUser;
