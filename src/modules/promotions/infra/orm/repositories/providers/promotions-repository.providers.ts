import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../entities/promotion.entity";

interface PromotionRepositoryProvider extends RepositoryProvider<Promotion> {
  findMostRelevantPromotionsByTags(tags: string[]): Promise<Promotion[]>;
  removeAllExpiredPromotions(): Promise<void>;
}

export default PromotionRepositoryProvider;
