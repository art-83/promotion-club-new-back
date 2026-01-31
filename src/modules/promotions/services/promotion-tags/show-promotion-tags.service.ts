import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionTag from "../../infra/orm/entities/promotion-tag.entity";
import PromotionTagQueryOptionsDTO from "../../dtos/promotion-tag/promotion-tag-query-options.dto";
@injectable()
class ShowPromotionTagsService {
  constructor(
    @inject("PromotionTagRepository")
    private promotionTagRepository: RepositoryProvider<PromotionTag>
  ) {}

  public async execute(options: Partial<PromotionTagQueryOptionsDTO>): Promise<PromotionTag[]> {
    return await this.promotionTagRepository.find(options);
  }
}

export default ShowPromotionTagsService;
