import { inject, injectable } from "tsyringe";
import PromotionTag from "../../infra/orm/entities/promotion-tag.entity";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";

@injectable()
class DeletePromotionTagService {
  constructor(
    @inject("PromotionTagRepository")
    private promotionTagRepository: RepositoryProvider<PromotionTag>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.promotionTagRepository.delete(id);
  }
}

export default DeletePromotionTagService;
