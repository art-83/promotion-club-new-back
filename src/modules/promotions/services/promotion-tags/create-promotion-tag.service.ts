import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionTag from "../../infra/orm/entities/promotion-tag.entity";
import CreateOrUpdatePromotionTagDTO from "../../dtos/promotion-tag/create-or-update-promotion-tag.dto";
import Tag from "../../infra/orm/entities/tag.entity";
import Promotion from "../../infra/orm/entities/promotion.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreatePromotionTagService {
  constructor(
    @inject("PromotionTagRepository")
    private promotionTagRepository: RepositoryProvider<PromotionTag>,
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>,
    @inject("TagRepository")
    private tagRepository: RepositoryProvider<Tag>
  ) {}

  public async execute(data: Partial<CreateOrUpdatePromotionTagDTO>): Promise<PromotionTag> {
    const [promotion, tag] = await Promise.all([
      (await this.promotionRepository.find({ id: data.promotion_id })).at(0),
      (await this.tagRepository.find({ id: data.tag_id })).at(0),
    ]);
    if (!promotion) throw new AppError(404, "Promotion not found.", "Promoção não encontrada.");
    if (!tag) throw new AppError(404, "Tag not found.", "Tag não encontrada.");
    data.promotion = promotion;
    data.tag = tag;
    return await this.promotionTagRepository.create(data);
  }
}

export default CreatePromotionTagService;
