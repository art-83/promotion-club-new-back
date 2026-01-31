import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../../infra/orm/entities/store.entity";
import Image from "../../../images/infra/orm/entities/image.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateStoreDTO from "../../dtos/stores/create-or-update-store.dto";

@injectable()
class UpdateStoreService {
  constructor(
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("ImageRepository")
    private imageRepository: RepositoryProvider<Image>
  ) {}

  public async execute(id: string, data: CreateOrUpdateStoreDTO): Promise<void> {
    if (data.image_id) {
      const image = (await this.imageRepository.find({ id: data.image_id })).at(0);
      if (!image) throw new AppError(404, "Image not found");
      data.image = image;
    }

    await this.storeRepository.update(id, data);
  }
}

export default UpdateStoreService;
