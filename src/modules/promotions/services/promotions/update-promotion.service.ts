import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";

@injectable()
class UpdatePromotionService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>
  ) {}

  public async execute(id: string, data: Partial<Promotion>): Promise<void> {
    await this.promotionRepository.update(id, data);
  }
}

export default UpdatePromotionService;
