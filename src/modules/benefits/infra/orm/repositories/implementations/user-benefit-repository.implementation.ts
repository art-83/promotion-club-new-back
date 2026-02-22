import { Repository } from "typeorm";
import UserBenefit from "../../entities/user-benefit.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import CreateOrUpdateUserBenefitsDTO from "../../../../dtos/user-benefits/create-or-update-user-benefits.dto";
import UserBenefitsQueryOptionsDTO from "../../../../dtos/user-benefits/user-benefits-query-options.dto";

class UserBenefitRepository implements RepositoryProvider<UserBenefit> {
  private repository: Repository<UserBenefit>;

  constructor() {
    this.repository = dataSource.getRepository(UserBenefit);
  }

  public async find(options: Partial<UserBenefitsQueryOptionsDTO>): Promise<UserBenefit[]> {
    const query = this.repository.createQueryBuilder("user_benefit");
    query.leftJoinAndSelect("user_benefit.benefit", "benefit");
    
    if (options.id) query.andWhere("user_benefit.id = :id", { id: options.id });
    if (options.user_id) query.andWhere("user_benefit.user_id = :user_id", { user_id: options.user_id });
    if (options.benefit_id) query.andWhere("user_benefit.benefit_id = :benefit_id", { benefit_id: options.benefit_id });
    if (options.start_date) query.andWhere("user_benefit.created_at >= :start_date", { start_date: options.start_date });
    if (options.end_date) query.andWhere("user_benefit.created_at <= :end_date", { end_date: options.end_date });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.andWhere("user_benefit.deleted_at IS NULL");
    return await query.getMany();
  }

  public async create(data: Partial<CreateOrUpdateUserBenefitsDTO>): Promise<UserBenefit> {
    const createUserBenefit = this.repository.create(data);
    const saveUserBenefit = await this.repository.save(createUserBenefit);
    return saveUserBenefit;
  }

  public async update(id: string, data: Partial<CreateOrUpdateUserBenefitsDTO>): Promise<void> {
    const updateUserBenefit = this.repository.create(data);
    await this.repository.update(id, updateUserBenefit);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default UserBenefitRepository;
