import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";
import Image from "../../../images/infra/orm/entities/image.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateProductDTO from "../../dtos/products/create-or-update-product.dto";

@injectable()
class UpdateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: RepositoryProvider<Product>,
    @inject("ImageRepository")
    private imageRepository: RepositoryProvider<Image>
  ) {}

  public async execute(id: string, data: CreateOrUpdateProductDTO): Promise<void> {
    let image;
    if (data.image_id) {
      image = (await this.imageRepository.find({ id: data.image_id })).at(0);
      if (!image) throw new AppError(404, "Image not found");
    }

    await this.productRepository.update(id, { ...data, image });
  }
}

export default UpdateProductService;
