import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
import CreateOrUpdatePromotionDTO from "../../dtos/promotions/create-or-update-promotion.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";
import Store from "../../../stores/infra/orm/entities/store.entity";
import Image from "../../../images/infra/orm/entities/image.entity";

@injectable()
class UpdatePromotionService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("ImageRepository")
    private imageRepository: RepositoryProvider<Image>
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdatePromotionDTO>): Promise<void> {
    const promotion = (await this.promotionRepository.find({ id })).at(0);
    if (!promotion) throw new AppError(404, "Promotion not found.");

    if (data.store_id) {
      const store = (await this.storeRepository.find({ id: data.store_id })).at(0);
      if (!store) throw new AppError(404, "Store not found.");
      data.store = store;
    }

    if (data.image_id) {
      const image = (await this.imageRepository.find({ id: data.image_id })).at(0);
      if (!image) throw new AppError(404, "Image not found.");
      data.image = image;
    }

    if (data.price || data.discount_percentage) {
      const price = data.price ?? promotion.price;
      const discount_percentage = data.discount_percentage ?? promotion.discount_percentage;
      data.final_price = Number(price) - Number(price) * (Number(discount_percentage) / 100);
    }

    await this.promotionRepository.update(id, data);
  }
}

export default UpdatePromotionService;
