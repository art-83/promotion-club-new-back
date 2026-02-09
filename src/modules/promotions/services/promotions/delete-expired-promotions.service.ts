import { inject, injectable } from "tsyringe";
import PromotionRepositoryProvider from "../../infra/orm/repositories/providers/promotions-repository.providers";

@injectable()
class DeleteExpiredPromotionsService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: PromotionRepositoryProvider
  ) {}

  public async execute(): Promise<void> {
    await this.promotionRepository.removeAllExpiredPromotions();
  }
}

export default DeleteExpiredPromotionsService;
