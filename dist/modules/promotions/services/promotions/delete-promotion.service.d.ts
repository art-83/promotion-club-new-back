import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
declare class DeletePromotionService {
    private promotionRepository;
    constructor(promotionRepository: RepositoryProvider<Promotion>);
    execute(id: string): Promise<void>;
}
export default DeletePromotionService;
//# sourceMappingURL=delete-promotion.service.d.ts.map