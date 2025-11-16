import { Repository } from "typeorm";
import Promotion from "../../entities/promotion.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionQueryOptionsDTO from "../../../../dtos/promotions/promotion-query-options.dto";
import PromotionRepositoryProviders from "../providers/promotions-repository.providers";

class PromotionRepository implements PromotionRepositoryProviders {
  private repository: Repository<Promotion>;

  constructor() {
    this.repository = dataSource.getRepository(Promotion);
  }

  public async find(options: PromotionQueryOptionsDTO): Promise<Promotion[]> {
    const query = this.repository.createQueryBuilder("promotions");

    if (options.id) query.andWhere("promotions.id = :id", { id: options.id });
    if (options.discount_percentage) {
      query.andWhere("promotions.discount_percentage = :discount_percentage", {
        discount_percentage: options.discount_percentage,
      });
    }
    if (options.final_price)
      query.andWhere("promotions.final_price = :final_price", {
        final_price: options.final_price,
      });
    if (options.expire_at)
      query.andWhere("promotions.expire_at = :expire_at", {
        expire_at: options.expire_at,
      });

    if (options.join_product) query.leftJoinAndSelect("promotions.product", "products");

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

    return await query.getMany();
  }

  public async create(data: Partial<Promotion>): Promise<Promotion> {
    const createPromotion = this.repository.create(data);
    const savePromotion = await this.repository.save(createPromotion);
    return savePromotion;
  }

  public async update(id: string, data: Partial<Promotion>): Promise<void> {
    await this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async removeAllExpiredPromotions(): Promise<void> {
    const now = new Date();
    await this.repository.createQueryBuilder("promotions").delete().from(Promotion).where("promotions.expire_at < :now", { now }).execute();
  }
}

export default PromotionRepository;
