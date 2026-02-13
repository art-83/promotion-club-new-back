import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../entities/promotion.entity";
import FindRecommendedOptionsDTO from "../../../../dtos/promotions/find-recommended-options.dto";

interface PromotionRepositoryProvider extends RepositoryProvider<Promotion> {
  findMostRelevantPromotionsByTags(promotion_id: string, tags: string[]): Promise<Promotion[]>;
  findRecommendedCandidates(options: FindRecommendedOptionsDTO): Promise<Promotion[]>;
  removeAllExpiredPromotions(): Promise<void>;
}

export default PromotionRepositoryProvider;
