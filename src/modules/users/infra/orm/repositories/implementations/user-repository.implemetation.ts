import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../entities/user.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import UserQueryOptionsDTO from "../../../../dtos/users/user-query-options.dto";

class UserRepository implements RepositoryProvider<User> {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  public async find(options: Partial<UserQueryOptionsDTO>): Promise<User[]> {
    const query = this.repository.createQueryBuilder("users");

    if (options.id) query.andWhere("users.id = :id", { id: options.id });
    if (options.name) query.andWhere("users.name ILIKE :name", { name: `%${options.name}%` });
    if (options.email)
      query.andWhere("users.email = :email", {
        email: options.email,
      });
    if (options.cpf) query.andWhere("users.cpf = :cpf", { cpf: options.cpf });
    if (options.created_at)
      query.andWhere("users.created_at = :created_at", {
        created_at: options.created_at,
      });
    if (options.updated_at)
      query.andWhere("users.updated_at = :updated_at", {
        updated_at: options.updated_at,
      });

    if (options.join_user_permissions) {
      query.leftJoinAndSelect("users.user_permissions", "user_permissions");
      query.leftJoinAndSelect("user_permissions.store", "store");
    }

    if (options.start_date)
      query.andWhere("users.create_at >= :start_date", {
        start_date: options.start_date,
      });
    if (options.end_date)
      query.andWhere("users.create_at <= :end_date", {
        end_date: options.end_date,
      });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    return await query.getMany();
  }

  public async create(data: Partial<User>): Promise<User> {
    const createUser = this.repository.create(data);
    const saveUser = await this.repository.save(createUser);
    return saveUser;
  }

  public async update(id: string, data: Partial<User>): Promise<void> {
    const updateUser = this.repository.create(data);
    await this.repository.update(id, updateUser);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default UserRepository;
