import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Benefit from "../../infra/orm/entities/benefit.entity";
import Store from "../../../stores/infra/orm/entities/store.entity";
import ImageRepositoryProvider from "../../../images/infra/orm/repositories/providers/image-repository.provider";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateBenefitsDTO from "../../dtos/benefits/create-or-update-benefits.dto";

@injectable()
class CreateBenefitService {
  constructor(
    @inject("BenefitRepository")
    private benefitRepository: RepositoryProvider<Benefit>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("ImageRepository")
    private imageRepository: ImageRepositoryProvider
  ) {}

  public async execute(data: Partial<CreateOrUpdateBenefitsDTO>): Promise<Benefit> {
    const store = (await this.storeRepository.find({ id: data.store_id })).at(0);
    if (!store) throw new AppError(404, "Store not found.");
    data.store = store;

    if (data.image_id) {
      const image = (await this.imageRepository.find({ id: data.image_id })).at(0);
      if (!image) throw new AppError(404, "Image not found.");
      data.image = image;
    }
    return await this.benefitRepository.create(data);
  }
}

export default CreateBenefitService;
