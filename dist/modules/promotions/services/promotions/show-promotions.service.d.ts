import PromotionQueryOptionsDTO from "../../dtos/promotions/promotion-query-options.dto";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
declare class ShowPromotionsServices {
    private promotionRepository;
    constructor(promotionRepository: RepositoryProvider<Promotion>);
    execute(options: Partial<PromotionQueryOptionsDTO>): Promise<Promotion[]>;
}
export default ShowPromotionsServices;
//# sourceMappingURL=show-promotions.service.d.ts.map