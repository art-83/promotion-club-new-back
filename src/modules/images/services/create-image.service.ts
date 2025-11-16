import { inject, injectable } from "tsyringe";
import Image from "../infra/orm/entities/image.entity";
import ImageRepositoryProvider from "../infra/orm/repositories/provider/image-repository.provider";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../promotions/infra/orm/entities/product.entity";
import CreateImageDTO from "../dtos/create-image.dto";
import AppError from "../../../shared/infra/http/errors/app-error";
@injectable()
class CreateImageService {
  constructor(
    @inject("ImageRepository")
    private imageRepository: ImageRepositoryProvider,
    @inject("ProductRepository")
    private productRepository: RepositoryProvider<Product>
  ) {}

  public async execute(data: CreateImageDTO): Promise<Image> {
    if (!data.file) throw new AppError(400, "Image not provided.");

    const product = (await this.productRepository.find({ id: data.body.product_id })).at(0);

    if (!product) throw new AppError(404, "Product not found.");

    const image = await this.imageRepository.create({
      name: data.file.originalname,
      path: data.file.filename,
      mimetype: data.file.mimetype,
      product: product,
    });

    return image;
  }
}

export default CreateImageService;
