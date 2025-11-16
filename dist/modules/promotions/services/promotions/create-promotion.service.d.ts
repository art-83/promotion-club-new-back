import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
import Product from "../../infra/orm/entities/product.entity";
import CreatePromotionDTO from "../../dtos/promotions/create-promotion.dto";
declare class CreatePromotionService {
    private promotionRepository;
    private productRepository;
    constructor(promotionRepository: RepositoryProvider<Promotion>, productRepository: RepositoryProvider<Product>);
    execute(data: Partial<CreatePromotionDTO>): Promise<Promotion>;
}
export default CreatePromotionService;
//# sourceMappingURL=create-promotion.service.d.ts.map