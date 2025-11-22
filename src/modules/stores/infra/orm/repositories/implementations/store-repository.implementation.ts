import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../../entities/store.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import StoreQueryOptionsDTO from "../../../../dtos/store-query-options.dto";
import CreateOrUpdateStoreDTO from "../../../../dtos/create-or-update-store.dto";

class StoreRepository implements RepositoryProvider<Store> {
  private repository: Repository<Store>;

  constructor() {
    this.repository = dataSource.getRepository(Store);
  }

  public async find(options: Partial<StoreQueryOptionsDTO>): Promise<Store[]> {
    const query = this.repository.createQueryBuilder("stores");

    query.leftJoinAndSelect("stores.image", "image");
    
    if (options.id) query.andWhere("stores.id = :id", { id: options.id });
    if (options.name) query.andWhere("stores.name = :name", { name: options.name });
    if (options.street) query.andWhere("stores.street = :street", { street: options.street });
    if (options.neighborhood) query.andWhere("stores.neighborhood = :neighborhood", { neighborhood: options.neighborhood });
    if (options.city) query.andWhere("stores.city = :city", { city: options.city });
    if (options.state) query.andWhere("stores.state = :state", { state: options.state });
    if (options.number) query.andWhere("stores.number = :number", { number: options.number });
    if (options.created_at)
      query.andWhere("stores.created_at = :created_at", {
        created_at: options.created_at,
      });
    if (options.updated_at)
      query.andWhere("stores.updated_at = :updated_at", {
        updated_at: options.updated_at,
      });

    if (options.start_date)
      query.andWhere("stores.create_at >= :start_date", {
        start_date: options.start_date,
      });
    if (options.end_date)
      query.andWhere("stores.create_at <= :end_date", {
        end_date: options.end_date,
      });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    return await query.getMany();
  }

  public async create(data: Partial<CreateOrUpdateStoreDTO>): Promise<Store> {
    const createStore = this.repository.create(data);
    const saveStore = await this.repository.save(createStore);
    return saveStore;
  }

  public async update(id: string, data: Partial<CreateOrUpdateStoreDTO>): Promise<void> {
    const updateStore = this.repository.create(data);
    await this.repository.update(id, updateStore);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default StoreRepository;
