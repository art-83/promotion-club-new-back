import RepositoryProvider from "../../infra/orm/repositories/providers/repository.provider";
import Promotion from "../../../modules/promotions/infra/orm/entities/promotion.entity";
declare class DeleteExpiredPromotionsService {
  private promotionRepository;
  constructor(promotionRepository: RepositoryProvider<Promotion>);
}
export default DeleteExpiredPromotionsService;
//# sourceMappingURL=delete-expired-promotions.service.d.ts.map
