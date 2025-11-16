import { inject, injectable } from "tsyringe";
import Promotion from "../../infra/orm/entities/promotion.entity";
import PromotionRepositoryProviders from "../../infra/orm/repositories/providers/promotions-repository.providers";

@injectable()
class DeleteExpiredPromotionsService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: PromotionRepositoryProviders
  ) {}

  public async execute(): Promise<void> {
    await this.promotionRepository.removeAllExpiredPromotions();
  }
}

export default DeleteExpiredPromotionsService;
