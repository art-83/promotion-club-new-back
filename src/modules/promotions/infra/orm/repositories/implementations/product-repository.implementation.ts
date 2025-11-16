import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../entities/product.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import ProductsQueryOptionsDTO from "../../../../dtos/products/product-query-options.dto";

class ProductRepository implements RepositoryProvider<Product> {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  public async find(options: ProductsQueryOptionsDTO): Promise<Product[]> {
    const query = this.repository.createQueryBuilder("products");

    if (options.id) query.andWhere("products.id = :id", { id: options.id });
    if (options.name) query.andWhere("products.name = :name", { name: options.name });
    if (options.price)
      query.andWhere("products.price = :price", {
        price: options.price,
      });

    if (options.join_store) query.leftJoinAndSelect("products.store", "stores");

    if (options.start_date)
      query.andWhere("products.create_at >= :start_date", {
        start_date: options.start_date,
      });
    if (options.end_date)
      query.andWhere("products.create_at <= :end_date", {
        end_date: options.end_date,
      });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    return await query.getMany();
  }

  public async create(data: Partial<Product>): Promise<Product> {
    const createProduct = this.repository.create(data);
    const saveProduct = await this.repository.save(createProduct);
    return saveProduct;
  }

  public async update(id: string, data: Partial<Product>): Promise<void> {
    await this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ProductRepository;
