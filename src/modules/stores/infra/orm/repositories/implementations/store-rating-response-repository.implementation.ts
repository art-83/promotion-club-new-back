import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRatingResponse from "../../entities/store-rating-response.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import StoreRatingResponseQueryOptionsDto from "../../../../dtos/store-rating-responses/store-rating-response-query-options.dto";
import CreateOrUpdateStoreRatingResponseDto from "../../../../dtos/store-rating-responses/create-or-update-store-rating-response.dto";

type CreateStoreRatingResponseData = Partial<CreateOrUpdateStoreRatingResponseDto> & Partial<StoreRatingResponse>;

class StoreRatingResponseRepository implements RepositoryProvider<StoreRatingResponse> {
  private repository: Repository<StoreRatingResponse>;

  constructor() {
    this.repository = dataSource.getRepository(StoreRatingResponse);
  }

  public async find(options: Partial<StoreRatingResponseQueryOptionsDto>): Promise<StoreRatingResponse[]> {
    const query = this.repository.createQueryBuilder("store_rating_responses");
    query.leftJoinAndSelect("store_rating_responses.user", "user");
    query.leftJoinAndSelect("store_rating_responses.store_rating", "store_rating");

    if (options.id) query.andWhere("store_rating_responses.id = :id", { id: options.id });
    if (options.user_id) query.andWhere("store_rating_responses.user_id = :user_id", { user_id: options.user_id });
    if (options.store_rating_id)
      query.andWhere("store_rating_responses.store_rating_id = :store_rating_id", { store_rating_id: options.store_rating_id });
    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.andWhere("store_rating_responses.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: CreateStoreRatingResponseData): Promise<StoreRatingResponse> {
    const storeRatingResponse = this.repository.create(data);
    return await this.repository.save(storeRatingResponse);
  }

  public async update(id: string, data: Partial<StoreRatingResponse>): Promise<void> {
    const updateData = this.repository.create(data);
    await this.repository.update(id, updateData);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default StoreRatingResponseRepository;
