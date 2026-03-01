import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionCategory from "../../entities/promotion-category.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionCategoryQueryOptionsDto from "../../../../dtos/promotion-categories/promotion-category-query-options.dto";
class PromotionCategoryRepository implements RepositoryProvider<PromotionCategory> {
  private repository: Repository<PromotionCategory>;

  constructor() {
    this.repository = dataSource.getRepository(PromotionCategory);
  }

  public async find(options: Partial<PromotionCategoryQueryOptionsDto>): Promise<PromotionCategory[]> {
    const query = this.repository.createQueryBuilder("promotion_categories");

    if (options.id) query.andWhere("promotion_categories.id = :id", { id: options.id });
    if (options.name) query.andWhere("promotion_categories.name ILIKE :name", { name: `%${options.name}%` });
    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.andWhere("promotion_categories.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<PromotionCategory>): Promise<PromotionCategory> {
    const promotionCategory = this.repository.create(data);
    return await this.repository.save(promotionCategory);
  }

  public async update(id: string, data: Partial<PromotionCategory>): Promise<void> {
    await this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default PromotionCategoryRepository;
