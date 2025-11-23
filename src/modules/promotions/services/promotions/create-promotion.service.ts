import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
import Product from "../../infra/orm/entities/product.entity";
import CreateOrUpdatePromotionDTO from "../../dtos/promotions/create-promotion.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreatePromotionService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>,
    @inject("ProductRepository")
    private productRepository: RepositoryProvider<Product>
  ) {}

  public async execute(data: Partial<CreateOrUpdatePromotionDTO>): Promise<Promotion> {
    const product = (await this.productRepository.find({ id: data.product_id })).at(0);

    if (!product) throw new AppError(404, "Product not found.");

    data.final_price = product.price - product.price * (Number(data.discount_percentage) / 100);
    data.product = product;

    const promotion = await this.promotionRepository.create(data);
    return promotion;
  }
}

export default CreatePromotionService;
