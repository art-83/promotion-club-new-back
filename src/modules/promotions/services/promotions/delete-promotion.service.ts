import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";

@injectable()
class DeletePromotionService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.promotionRepository.delete(id);
  }
}

export default DeletePromotionService;
