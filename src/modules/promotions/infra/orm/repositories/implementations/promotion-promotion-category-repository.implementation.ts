import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionPromotionCategory from "../../entities/promotion-promotion-category.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionPromotionCategoryQueryOptionsDto from "../../../../dtos/promotion-promotion-categories/promotion-promotion-category-query-options.dto";
import CreateOrUpdatePromotionPromotionCategoryDto from "../../../../dtos/promotion-promotion-categories/create-or-update-promotion-promotion-category.dto";

class PromotionPromotionCategoryRepository implements RepositoryProvider<PromotionPromotionCategory> {
  private repository: Repository<PromotionPromotionCategory>;

  constructor() {
    this.repository = dataSource.getRepository(PromotionPromotionCategory);
  }

  public async find(options: Partial<PromotionPromotionCategoryQueryOptionsDto>): Promise<PromotionPromotionCategory[]> {
    const query = this.repository.createQueryBuilder("promotions_promotion_categories");

    if (options.id) query.andWhere("promotions_promotion_categories.id = :id", { id: options.id });
    if (options.promotion_id) query.andWhere("promotions_promotion_categories.promotion_id = :promotion_id", { promotion_id: options.promotion_id });
    if (options.promotion_category_id) query.andWhere("promotions_promotion_categories.promotion_category_id = :promotion_category_id", { promotion_category_id: options.promotion_category_id });

    query.andWhere("promotions_promotion_categories.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<CreateOrUpdatePromotionPromotionCategoryDto>): Promise<PromotionPromotionCategory> {
    const promotionPromotionCategory = this.repository.create(data);
    return await this.repository.save(promotionPromotionCategory);
  }

  public async update(id: string, data: Partial<PromotionPromotionCategory>): Promise<void> {
    const updateData = this.repository.create(data);
    await this.repository.update(id, updateData);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default PromotionPromotionCategoryRepository;
