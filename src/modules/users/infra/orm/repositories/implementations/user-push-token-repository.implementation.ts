import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import dataSource from "../../../../../../shared/infra/orm/database";
import UserPushToken from "../../entities/user-push-token.entity";
import CreateOrUpdateUserPushTokenDTO from "../../../../dtos/user-push-tokens/create-or-update-user-push-token.dto";

class UserPushTokenRepository implements RepositoryProvider<UserPushToken> {
  private repository: Repository<UserPushToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserPushToken);
  }

  public async find(options: Partial<CreateOrUpdateUserPushTokenDTO>): Promise<UserPushToken[]> {
    const query = this.repository.createQueryBuilder("user_push_tokens");

    if (options.user_id) {
      query.andWhere("user_push_tokens.user_id = :user_id", { user_id: options.user_id });
    }

    if (options.platform) {
      query.andWhere("user_push_tokens.platform = :platform", { platform: options.platform });
    }

    query.andWhere("user_push_tokens.deleted_at IS NULL");

    const userPushTokens = await query.getMany();
    return userPushTokens;
  }

  public async create(data: Partial<CreateOrUpdateUserPushTokenDTO>): Promise<UserPushToken> {
    const createUserPushToken = this.repository.create(data);
    const saveUserPushToken = await this.repository.save(createUserPushToken);
    return saveUserPushToken;
  }

  public async update(id: string, data: Partial<CreateOrUpdateUserPushTokenDTO>): Promise<void> {
    const updateUserPushToken = this.repository.create(data);
    await this.repository.update(id, updateUserPushToken);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UserPushTokenRepository;
