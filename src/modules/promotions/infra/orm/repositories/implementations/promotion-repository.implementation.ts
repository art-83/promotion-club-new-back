import { LessThan, Repository } from "typeorm";
import Promotion from "../../entities/promotion.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionQueryOptionsDTO from "../../../../dtos/promotions/promotion-query-options.dto";
import PromotionRepositoryProviders from "../providers/promotions-repository.providers";

class PromotionRepository implements PromotionRepositoryProviders {
  private repository: Repository<Promotion>;

  constructor() {
    this.repository = dataSource.getRepository(Promotion);
  }

  public async find(options: Partial<PromotionQueryOptionsDTO>): Promise<Promotion[]> {
    const query = this.repository.createQueryBuilder("promotions");

    query.leftJoinAndSelect("promotions.promotion_tags", "promotion_tags");
    query.leftJoinAndSelect("promotion_tags.tag", "tag");
    
    if (options.id) {
      query.andWhere("promotions.id = :id", { id: options.id });
    }

    if (options.name) {
      query.andWhere("promotions.name ILIKE :name", { name: `%${options.name}%` });
    }

    if (options.discount_percentage) {
      query.andWhere("promotions.discount_percentage = :discount_percentage", {
        discount_percentage: options.discount_percentage,
      });
    }

    if (options.is_approved == true) {
      query.andWhere("promotions.is_approved = :is_approved", { is_approved: "t" });
    }

    if (options.is_approved == false) {
      query.andWhere("promotions.is_approved = :is_approved", { is_approved: "f" });
    }

    if (options.final_price)
      query.andWhere("promotions.final_price = :final_price", {
        final_price: options.final_price,
      });

    if (options.start_final_price) query.andWhere("promotions.final_price >= :start_final_price", { start_final_price: options.start_final_price });
    if (options.end_final_price) query.andWhere("promotions.final_price <= :end_final_price", { end_final_price: options.end_final_price });

    if (options.expire_at)
      query.andWhere("promotions.expire_at = :expire_at", {
        expire_at: options.expire_at,
      });

    if (options.store_id) {
      query.andWhere("promotions.store_id = :store_id", {
        store_id: options.store_id,
      });
    }

    if (options.join_store) {
      query.leftJoinAndSelect("promotions.store", "store");
    }

    if (options.join_image) {
      query.leftJoinAndSelect("promotions.image", "image");
    }

    if (options.start_date)
      query.andWhere("promotions.create_at >= :start_date", {
        start_date: options.start_date,
      });
    if (options.end_date)
      query.andWhere("promotions.create_at <= :end_date", {
        end_date: options.end_date,
      });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.andWhere("promotions.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<Promotion>): Promise<Promotion> {
    const createPromotion = this.repository.create(data);
    const savePromotion = await this.repository.save(createPromotion);
    return savePromotion;
  }

  public async update(id: string, data: Partial<Promotion>): Promise<void> {
    const updatePromotion = this.repository.create(data);
    await this.repository.update(id, updatePromotion);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  public async removeAllExpiredPromotions(): Promise<void> {
    const now = new Date();
    await this.repository.softDelete({ expire_at: LessThan(now) });
  }
}

export default PromotionRepository;
