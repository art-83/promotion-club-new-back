import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserPermissions from "../../entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../../../dtos/users-permissions/user-permissions-query-options.dto";
import dataSource from "../../../../../../shared/infra/orm/database";
import CreateOrUpdateUserPermissions from "../../../../dtos/users-permissions/create-or-update-user-permissions.dto";

class UserPermissionsRepository implements RepositoryProvider<UserPermissions> {
  private repository: Repository<UserPermissions>;

  constructor() {
    this.repository = dataSource.getRepository(UserPermissions);
  }

  public async find(options: UserPermissionsQueryOptionsDTO): Promise<UserPermissions[]> {
    const query = this.repository.createQueryBuilder("user_permissions");
    query.leftJoinAndSelect("user_permissions.user", "users");

    if (options.id) query.andWhere("user_permissions.id = :id", { id: options.id });
    if (options.user_id)
      query.andWhere("users.id = :user_id", {
        user_id: options.user_id,
      });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    return await query.getMany();
  }

  public async create(data: Partial<CreateOrUpdateUserPermissions>): Promise<UserPermissions> {
    const createUserPermission = this.repository.create(data);
    const saveUserPermission = await this.repository.save(createUserPermission);
    return saveUserPermission;
  }

  public async update(id: string, data: Partial<CreateOrUpdateUserPermissions>): Promise<void> {
    await this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UserPermissionsRepository;
