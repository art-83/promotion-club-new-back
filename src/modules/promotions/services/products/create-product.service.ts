import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";
import Image from "../../../images/infra/orm/entities/image.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateProductDTO from "../../dtos/products/create-or-update-product.dto";
import Store from "../../../stores/infra/orm/entities/store.entity";

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: RepositoryProvider<Product>,
    @inject("ImageRepository")
    private imageRepository: RepositoryProvider<Image>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(data: CreateOrUpdateProductDTO) {
    if (data.image_id) {
      const image = (await this.imageRepository.find({ id: data.image_id })).at(0);
      if (!image) throw new AppError(404, "Image not found.");
      data.image = image;
    }

    const store = (await this.storeRepository.find({ id: data.store_id })).at(0);

    if (!store) throw new AppError(404, "Store not found.");

    data.store = store;

    const product = await this.productRepository.create(data);
    return product;
  }
}

export default CreateProductService;
