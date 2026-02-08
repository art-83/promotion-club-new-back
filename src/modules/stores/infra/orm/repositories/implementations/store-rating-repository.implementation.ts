import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRating from "../../entities/store-rating.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import StoreRatingQueryOptionsDto from "../../../../dtos/store-ratings/store-rating-query-options.dto";
import CreateOrUpdateStoreRatingDto from "../../../../dtos/store-ratings/create-or-update-store-rating.dto";

type CreateStoreRatingData = Partial<CreateOrUpdateStoreRatingDto> & Partial<StoreRating>;

class StoreRatingRepository implements RepositoryProvider<StoreRating> {
  private repository: Repository<StoreRating>;

  constructor() {
    this.repository = dataSource.getRepository(StoreRating);
  }

  public async find(options: Partial<StoreRatingQueryOptionsDto>): Promise<StoreRating[]> {
    const query = this.repository.createQueryBuilder("store_ratings");

    if (options.id) query.andWhere("store_ratings.id = :id", { id: options.id });
    if (options.user_id) query.andWhere("store_ratings.user_id = :user_id", { user_id: options.user_id });
    if (options.store_id) query.andWhere("store_ratings.store_id = :store_id", { store_id: options.store_id });
    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.andWhere("store_ratings.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: CreateStoreRatingData): Promise<StoreRating> {
    const storeRating = this.repository.create(data);
    return await this.repository.save(storeRating);
  }

  public async update(id: string, data: Partial<StoreRating>): Promise<void> {
    const updateData = this.repository.create(data);
    await this.repository.update(id, updateData);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default StoreRatingRepository;
