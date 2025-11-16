import Promotion from "../../entities/promotion.entity";
import PromotionQueryOptionsDTO from "../../../../dtos/promotions/promotion-query-options.dto";
import PromotionRepositoryProviders from "../providers/promotions-repository.providers";
declare class PromotionRepository implements PromotionRepositoryProviders {
    private repository;
    constructor();
    find(options: PromotionQueryOptionsDTO): Promise<Promotion[]>;
    create(data: Partial<Promotion>): Promise<Promotion>;
    update(id: string, data: Partial<Promotion>): Promise<void>;
    delete(id: string): Promise<void>;
    removeAllExpiredPromotions(): Promise<void>;
}
export default PromotionRepository;
//# sourceMappingURL=promotion-repository.implementation.d.ts.map