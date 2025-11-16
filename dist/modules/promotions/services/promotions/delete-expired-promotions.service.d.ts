import PromotionRepositoryProviders from "../../infra/orm/repositories/providers/promotions-repository.providers";
declare class DeleteExpiredPromotionsService {
    private promotionRepository;
    constructor(promotionRepository: PromotionRepositoryProviders);
    execute(): Promise<void>;
}
export default DeleteExpiredPromotionsService;
//# sourceMappingURL=delete-expired-promotions.service.d.ts.map