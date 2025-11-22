import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../entities/product.entity";
import ProductsQueryOptionsDTO from "../../../../dtos/products/product-query-options.dto";
import CreateOrUpdateProductDTO from "../../../../dtos/products/create-or-update-product.dto";
import dataSource from "../../../../../../shared/infra/orm/database";

class ProductRepository implements RepositoryProvider<Product> {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  public async find(options: Partial<ProductsQueryOptionsDTO>): Promise<Product[]> {
    const query = this.repository.createQueryBuilder("products");
    query.leftJoinAndSelect("products.store", "stores");

    if (options.id) query.andWhere("products.id = :id", { id: options.id });
    if (options.name) query.andWhere("products.name ILIKE :name", { name: `%${options.name}%` });
    if (options.price) query.andWhere("products.price = :price", { price: options.price });

    if (options.store_id) query.andWhere("products.store_id = :store_id", { store_id: options.store_id });

    if (options.join_image) query.leftJoinAndSelect("products.image", "image");

    if (options.start_date) query.andWhere("products.create_at >= :start_date", { start_date: options.start_date });
    if (options.end_date) query.andWhere("products.create_at <= :end_date", { end_date: options.end_date });

    if (options.start_price) query.andWhere("products.price >= :start_price", { start_price: options.start_price });
    if (options.end_price) query.andWhere("products.price <= :end_price", { end_price: options.end_price });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    return await query.getMany();
  }

  public async create(data: Partial<CreateOrUpdateProductDTO>): Promise<Product> {
    const createProduct = this.repository.create(data);
    const saveProduct = await this.repository.save(createProduct);
    return saveProduct;
  }

  public async update(id: string, data: Partial<CreateOrUpdateProductDTO>): Promise<void> {
    const updateProduct = this.repository.create(data);
    await this.repository.update(id, updateProduct);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ProductRepository;
