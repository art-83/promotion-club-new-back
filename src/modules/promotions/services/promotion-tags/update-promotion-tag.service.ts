import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import CreateOrUpdatePromotionTagDTO from "../../dtos/promotion-tag/create-or-update-promotion-tag.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";
import PromotionTag from "../../infra/orm/entities/promotion-tag.entity";

@injectable()
class UpdatePromotionTagService {
  constructor(
    @inject("PromotionTagRepository")
    private promotionTagRepository: RepositoryProvider<PromotionTag>
  ) {}

  public async execute(id: string, data: CreateOrUpdatePromotionTagDTO): Promise<void> {
    const promotionTag = (await this.promotionTagRepository.find({ id })).at(0);
    if (!promotionTag) throw new AppError(404, "PromotionTag not found.");

    await this.promotionTagRepository.update(id, data);
  }
}

export default UpdatePromotionTagService;
