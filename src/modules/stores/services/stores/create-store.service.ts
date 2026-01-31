import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../../infra/orm/entities/store.entity";
import Image from "../../../images/infra/orm/entities/image.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import ImageRepositoryProvider from "../../../images/infra/orm/repositories/providers/image-repository.provider";
import CreateStoreDTO from "../../dtos/stores/create-or-update-store.dto";

@injectable()
class CreateStoreService {
  constructor(
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("ImageRepository")
    private imageRepository: ImageRepositoryProvider
  ) {}

  public async execute(data: CreateStoreDTO): Promise<Store> {
    if (data.image_id) {
      const image = (await this.imageRepository.find({ id: data.image_id })).at(0);
      if (!image) throw new AppError(404, "Image not found");
      data.image = image;
    }

    const store = await this.storeRepository.create(data);
    return store;
  }
}

export default CreateStoreService;
