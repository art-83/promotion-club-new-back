import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
import PromotionTicket from "../../../tickets/infra/orm/entities/promotion-ticket.entity";
import PromotionTicketQueryOptionsDTO from "../../../tickets/dtos/promotion-ticket-query-options.dto";
import PromotionQueryOptionsDTO from "../../dtos/promotions/promotion-query-options.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";
import PromotionTagQueryOptionsDTO from "../../dtos/promotion-tag/promotion-tag-query-options.dto";
import PromotionTagRepository from "../../infra/orm/repositories/implementations/promotion-tag-repository.implementation";
import PromotionTag from "../../infra/orm/entities/promotion-tag.entity";
import PromotionRepositoryProvider from "../../infra/orm/repositories/providers/promotions-repository.providers";

@injectable()
class ShowListOfRecommendedPromotionsByPromotionTicketService {
  private readonly BASE_RELEVANCE_MULTIPLIER = 1.8;
  private readonly BASE_RELEVANCE_MULTIPLIER_DECREMENT = 0.1;

  constructor(
    @inject("PromotionRepository")
    private promotionRepository: PromotionRepositoryProvider,
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: RepositoryProvider<PromotionTicket>,
    @inject("PromotionTagRepository")
    private promotionTagRepository: RepositoryProvider<PromotionTag>,
    ) {}

  public async execute(user_id: string, promotion_ticket_id: string): Promise<Promotion[]> {
    const promotionTagsQueryOptions = {
      user_id,
    } as Partial<PromotionTagQueryOptionsDTO>;
    
    const userPromotionTags = await this.promotionTagRepository.find(promotionTagsQueryOptions);

    if (!userPromotionTags.length) throw new AppError(404, "User promotion tags not found");

    const userTagsAvarage = new Map<string, number>();
    
    for (const promotionTag of userPromotionTags) {
      if(userTagsAvarage.has(promotionTag.tag.id)) {
        userTagsAvarage.set(promotionTag.tag.id, Number(userTagsAvarage.get(promotionTag.tag.id)) + 1);
      } else {
        userTagsAvarage.set(promotionTag.tag.id, 1);
      }
    }
    
    const mostRelevantTags = Array.from(userTagsAvarage.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const promotionTicketQueryOptions = {
      id: promotion_ticket_id,
    } as Partial<PromotionTicketQueryOptionsDTO>;

    const promotionTicket = (await this.promotionTicketRepository.find(promotionTicketQueryOptions)).at(0);

    if (!promotionTicket) throw new AppError(404, "Promotion ticket not found");

    const relevatePromotionTicketTagIds = promotionTicket.promotion.promotion_tags.map((tag) => tag.tag.id);

    let relevanceMultiplier = this.BASE_RELEVANCE_MULTIPLIER;

    for (const tag of mostRelevantTags) {
      for (const relevatePromotionTicketTagId of relevatePromotionTicketTagIds) {
        if(tag[0] === relevatePromotionTicketTagId) {
          tag[1] *= relevanceMultiplier;
          relevanceMultiplier -= this.BASE_RELEVANCE_MULTIPLIER_DECREMENT;
        }
      }
    }

    const topRelevantTags = mostRelevantTags.sort((a, b) => b[1] - a[1]).slice(0, 3);

    const mostRelevantPromotions = await this.promotionRepository.findMostRelevantPromotionsByTags(topRelevantTags.map((tag) => tag[0]));

    if (!mostRelevantPromotions.length) throw new AppError(404, "No recommended promotions found");

    const topSellersMostRelevantPromotions = mostRelevantPromotions.sort((a, b) => b.promotion_tickets.length - a.promotion_tickets.length).slice(0, 3);
    
    return topSellersMostRelevantPromotions;
  }
}


export default ShowListOfRecommendedPromotionsByPromotionTicketService;
