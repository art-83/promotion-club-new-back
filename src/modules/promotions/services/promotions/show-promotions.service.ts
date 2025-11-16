import { inject, injectable } from "tsyringe";
import PromotionQueryOptionsDTO from "../../dtos/promotions/promotion-query-options.dto";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";

@injectable()
class ShowPromotionsServices {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>
  ) {}

  public async execute(options: Partial<PromotionQueryOptionsDTO>): Promise<Promotion[]> {
    return await this.promotionRepository.find(options);
  }
}

export default ShowPromotionsServices;
