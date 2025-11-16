import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../entities/promotion.entity";
interface PromotionRepositoryProviders extends RepositoryProvider<Promotion> {
    removeAllExpiredPromotions(): Promise<void>;
}
export default PromotionRepositoryProviders;
//# sourceMappingURL=promotions-repository.providers.d.ts.map