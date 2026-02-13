import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreStoreCategory from "../../entities/store-store-category.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import StoreCategoryQueryOptionsDto from "../../../../dtos/store-categories/store-category-query-options.dto";
import CreateOrUpdateStoreCategoryDto from "../../../../dtos/store-categories/create-or-update-store-category.dto";

class StoreStoreCategoryRepository implements RepositoryProvider<StoreStoreCategory> {
  private repository: Repository<StoreStoreCategory>;

  constructor() {
    this.repository = dataSource.getRepository(StoreStoreCategory);
  }

  public async find(options: Partial<StoreCategoryQueryOptionsDto>): Promise<StoreStoreCategory[]> {
    const query = this.repository.createQueryBuilder("stores_store_categories");

    if (options.id) query.andWhere("stores_store_categories.id = :id", { id: options.id });
    if (options.store_id) query.andWhere("stores_store_categories.store_id = :store_id", { store_id: options.store_id });
    if (options.category_id) query.andWhere("stores_store_categories.category_id = :category_id", { category_id: options.category_id });

    query.andWhere("stores_store_categories.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<CreateOrUpdateStoreCategoryDto>): Promise<StoreStoreCategory> {
    const storeStoreCategory = this.repository.create(data);
    return await this.repository.save(storeStoreCategory);
  }

  public async update(id: string, data: Partial<StoreStoreCategory>): Promise<void> {
    const updateData = this.repository.create(data);
    await this.repository.update(id, updateData);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default StoreStoreCategoryRepository;
