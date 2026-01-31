import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreCategory from "../../entities/store-category.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import StoreCategoryQueryOptionsDto from "../../../../dtos/store-categories/store-category-query-options.dto";
import CreateOrUpdateStoreCategoryDto from "../../../../dtos/store-categories/create-or-update-store-category.dto";

class StoreCategoryRepository implements RepositoryProvider<StoreCategory> {
  private repository: Repository<StoreCategory>;

  constructor() {
    this.repository = dataSource.getRepository(StoreCategory);
  }

  public async find(options: Partial<StoreCategoryQueryOptionsDto>): Promise<StoreCategory[]> {
    const query = this.repository.createQueryBuilder("store_category");

    if (options.id) query.andWhere("store_category.id = :id", { id: options.id });
    if (options.store_id)
      query.andWhere("store_category.store_id = :store_id", { store_id: options.store_id });
    if (options.category_id)
      query.andWhere("store_category.category_id = :category_id", { category_id: options.category_id });

    query.andWhere("store_category.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<CreateOrUpdateStoreCategoryDto>): Promise<StoreCategory> {
    const storeCategory = this.repository.create(data);
    return await this.repository.save(storeCategory);
  }

  public async update(id: string, data: Partial<StoreCategory>): Promise<void> {
    const updateData = this.repository.create(data);
    await this.repository.update(id, updateData);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default StoreCategoryRepository;
