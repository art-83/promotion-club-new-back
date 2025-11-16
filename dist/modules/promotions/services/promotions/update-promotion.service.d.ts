import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
declare class UpdatePromotionService {
    private promotionRepository;
    constructor(promotionRepository: RepositoryProvider<Promotion>);
    execute(id: string, data: Partial<Promotion>): Promise<void>;
}
export default UpdatePromotionService;
//# sourceMappingURL=update-promotion.service.d.ts.map