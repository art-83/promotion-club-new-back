import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserStoreOptions from "../../entities/user-store-options.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import UserStoreOptionsQueryOptionsDTO from "../../../../dtos/user-store-options/user-store-options-query-options.dto";
import CreateOrUpdateUserStoreOptionsDTO from "../../../../dtos/user-store-options/create-or-update-user-store-options.dto";

class UserStoreOptionsRepository implements RepositoryProvider<UserStoreOptions> {
  private repository: Repository<UserStoreOptions>;

  constructor() {
    this.repository = dataSource.getRepository(UserStoreOptions);
  }

  public async find(options: Partial<UserStoreOptionsQueryOptionsDTO>): Promise<UserStoreOptions[]> {
    const query = this.repository.createQueryBuilder("user_store_options");

    if (options.id) query.andWhere("user_store_options.id = :id", { id: options.id });
    if (options.user_id) query.andWhere("user_store_options.user_id = :user_id", { user_id: options.user_id });
    if (options.store_id) query.andWhere("user_store_options.store_id = :store_id", { store_id: options.store_id });

    query.leftJoinAndSelect("user_store_options.user", "user");
    query.leftJoinAndSelect("user_store_options.store", "store");
    return await query.getMany();
  }

  public async create(data: Partial<UserStoreOptions>): Promise<UserStoreOptions> {
    const createUserStoreOptions = this.repository.create(data);
    const saveUserStoreOptions = await this.repository.save(createUserStoreOptions);
    return saveUserStoreOptions;
  }

  public async update(id: string, data: Partial<CreateOrUpdateUserStoreOptionsDTO>): Promise<void> {
    const updateUserStoreOptions = this.repository.create(data);
    await this.repository.update(id, updateUserStoreOptions);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UserStoreOptionsRepository;
