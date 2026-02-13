import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreCategory from "../../entities/store-category.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import CategoryQueryOptionsDto from "../../../../dtos/categories/category-query-options.dto";
import CreateCategoryDto from "../../../../dtos/categories/create-category.dto";

class StoreCategoryRepository implements RepositoryProvider<StoreCategory> {
  private repository: Repository<StoreCategory>;

  constructor() {
    this.repository = dataSource.getRepository(StoreCategory);
  }

  public async find(options: Partial<CategoryQueryOptionsDto>): Promise<StoreCategory[]> {
    const query = this.repository.createQueryBuilder("store_categories");

    if (options.id) query.andWhere("store_categories.id = :id", { id: options.id });
    if (options.name) query.andWhere("store_categories.name ILIKE :name", { name: `%${options.name}%` });
    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.andWhere("store_categories.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<CreateCategoryDto>): Promise<StoreCategory> {
    const storeCategory = this.repository.create(data);
    return await this.repository.save(storeCategory);
  }

  public async update(id: string, data: Partial<StoreCategory>): Promise<void> {
    await this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default StoreCategoryRepository;
