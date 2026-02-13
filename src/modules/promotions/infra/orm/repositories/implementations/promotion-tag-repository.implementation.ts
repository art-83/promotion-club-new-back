import { Repository } from "typeorm";
import PromotionTag from "../../entities/promotion-tag.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionTagQueryOptionsDTO from "../../../../dtos/promotion-tag/promotion-tag-query-options.dto";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";

class PromotionTagRepository implements RepositoryProvider<PromotionTag> {
  private repository: Repository<PromotionTag>;

  constructor() {
    this.repository = dataSource.getRepository(PromotionTag);
  }

  public async find(options: PromotionTagQueryOptionsDTO): Promise<PromotionTag[]> {
    const query = this.repository.createQueryBuilder("promotion_tag");

    if (options.id) query.andWhere("promotion_tag.id = :id", { id: options.id });
    if (options.promotion_id) query.andWhere("promotion_tag.promotion_id = :promotion_id", { promotion_id: options.promotion_id });
    if (options.tag_id) query.andWhere("promotion_tag.tag_id = :tag_id", { tag_id: options.tag_id });
    if (options.user_id) {
      query.leftJoinAndSelect("promotion_tag.promotion", "promotion");
      query.leftJoinAndSelect("promotion_tag.tag", "tag");
      query.innerJoin("promotion.promotion_tickets", "promotion_tickets", "promotion_tickets.user_id = :user_id", { user_id: options.user_id });
    }

    query.andWhere("promotion_tag.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<PromotionTag>): Promise<PromotionTag> {
    const createPromotionTag = this.repository.create(data);
    const savePromotionTag = await this.repository.save(createPromotionTag);
    return savePromotionTag;
  }

  public async update(id: string, data: Partial<PromotionTag>): Promise<void> {
    const updatePromotionTag = this.repository.create(data);
    await this.repository.update(id, updatePromotionTag);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default PromotionTagRepository;
