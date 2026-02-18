import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
import CreateOrUpdatePromotionDTO from "../../dtos/promotions/create-or-update-promotion.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";
import Store from "../../../stores/infra/orm/entities/store.entity";
import File from "../../../files/infra/orm/entities/file.entity";

@injectable()
class CreatePromotionService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("FileRepository")
    private fileRepository: RepositoryProvider<File>
  ) {}

  public async execute(data: Partial<CreateOrUpdatePromotionDTO>): Promise<Promotion> {
    const store = (await this.storeRepository.find({ id: data.store_id })).at(0);
    if (!store) throw new AppError(404, "Store not found.");
    data.store = store;

    if (data.file_id) {
      const file = (await this.fileRepository.find({ id: data.file_id })).at(0);
      if (!file) throw new AppError(404, "File not found.");
      data.file = file;
    }

    data.final_price = Number(data.price) - Number(data.price) * (Number(data.discount_percentage) / 100);

    const promotion = await this.promotionRepository.create(data);
    return promotion;
  }
}

export default CreatePromotionService;
