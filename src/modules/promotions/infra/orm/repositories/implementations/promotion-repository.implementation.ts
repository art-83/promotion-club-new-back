import { LessThan, Repository } from "typeorm";
import Promotion from "../../entities/promotion.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionQueryOptionsDTO from "../../../../dtos/promotions/promotion-query-options.dto";
import FindRecommendedOptionsDTO from "../../../../dtos/promotions/find-recommended-options.dto";
import PromotionRepositoryProvider from "../providers/promotions-repository.providers";

class PromotionRepository implements PromotionRepositoryProvider {
  private repository: Repository<Promotion>;

  constructor() {
    this.repository = dataSource.getRepository(Promotion);
  }

  public async find(options: Partial<PromotionQueryOptionsDTO>): Promise<Promotion[]> {
    const query = this.repository.createQueryBuilder("promotions");

    query.leftJoinAndSelect("promotions.promotion_tags", "promotion_tags");
    query.leftJoinAndSelect("promotion_tags.tag", "tag");
    query.leftJoinAndSelect("promotions.promotion_promotion_categories", "promotion_promotion_categories");
    query.leftJoinAndSelect("promotion_promotion_categories.promotion_category", "promotion_category");

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
    if (options.not_expired === true) {
      query.andWhere("promotions.expire_at > :now", { now: new Date() });
    }

    if (options.store_id) {
      query.andWhere("promotions.store_id = :store_id", {
        store_id: options.store_id,
      });
    }

    if (options.join_store) {
      query.leftJoinAndSelect("promotions.store", "store");
    }

    if (options.join_file) {
      query.leftJoinAndSelect("promotions.file", "file");
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
    query.orderBy("promotions.created_at", "DESC");

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

  public async findMostRelevantPromotionsByTags(promotion_id: string, tags: string[]): Promise<Promotion[]> {
    if (!tags.length) return [];
    const query = this.repository.createQueryBuilder("promotions");
    query.leftJoinAndSelect("promotions.promotion_tags", "promotion_tags");
    query.leftJoinAndSelect("promotion_tags.tag", "tag");
    query.leftJoinAndSelect("promotions.promotion_tickets", "promotion_tickets");
    query.leftJoinAndSelect("promotions.store", "store");
    query.leftJoinAndSelect("promotions.promotion_promotion_categories", "promotion_promotion_categories");
    query.leftJoinAndSelect("promotion_promotion_categories.promotion_category", "promotion_category");
    query.andWhere("tag.id IN (:...tags)", { tags });
    query.andWhere("promotions.deleted_at IS NULL");
    query.andWhere("promotions.id != :promotion_id", { promotion_id });
    query.orderBy("promotions.created_at", "DESC");
    return await query.getMany();
  }

  public async findRecommendedCandidates(options: FindRecommendedOptionsDTO): Promise<Promotion[]> {
    const { tagIds, excludePromotionIds, limit = 100, join_file = true } = options;
    if (!tagIds.length) return [];

    const query = this.repository.createQueryBuilder("promotions");
    query.leftJoinAndSelect("promotions.promotion_tags", "promotion_tags");
    query.leftJoinAndSelect("promotion_tags.tag", "tag");
    query.leftJoinAndSelect("promotions.store", "store");
    query.leftJoinAndSelect("promotions.promotion_promotion_categories", "promotion_promotion_categories");
    query.leftJoinAndSelect("promotion_promotion_categories.promotion_category", "promotion_category");

    query.andWhere("tag.id IN (:...tagIds)", { tagIds });
    query.andWhere("promotions.deleted_at IS NULL");
    query.andWhere("promotions.is_approved = :is_approved", { is_approved: "t" });
    query.andWhere("promotions.expire_at > :now", { now: new Date() });

    if (excludePromotionIds.length > 0) {
      query.andWhere("promotions.id NOT IN (:...excludePromotionIds)", { excludePromotionIds });
    }

    if (join_file) {
      query.leftJoinAndSelect("promotions.file", "file");
    }

    query.orderBy("promotions.created_at", "DESC");
    query.take(limit);

    return await query.getMany();
  }

  public async removeAllExpiredPromotions(): Promise<void> {
    const now = new Date();
    await this.repository.softDelete({ expire_at: LessThan(now) });
  }
}

export default PromotionRepository;
