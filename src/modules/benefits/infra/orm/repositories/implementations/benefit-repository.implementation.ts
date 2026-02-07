import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Benefit from "../../entities/benefit.entity";
import { Repository } from "typeorm";
import dataSource from "../../../../../../shared/infra/orm/database";
import BenefitsQueryOptionsDTO from "../../../../dtos/benefits/benefits-query-options.dto";

class BenefitRepository implements RepositoryProvider<Benefit> {
  private repository: Repository<Benefit>;

  constructor() {
    this.repository = dataSource.getRepository(Benefit);
  }

  public async find(options: Partial<BenefitsQueryOptionsDTO>): Promise<Benefit[]> {
    const query = this.repository.createQueryBuilder("benefit");
    if (options.id) query.andWhere("benefit.id = :id", { id: options.id });
    if (options.store_id) query.andWhere("benefit.store_id = :store_id", { store_id: options.store_id });
    if (options.join_image) query.leftJoinAndSelect("benefit.image", "image");
    if (options.join_store) query.leftJoinAndSelect("benefit.store", "store");
    query.andWhere("benefit.deleted_at IS NULL");

    if (options.start_date) query.andWhere("benefit.created_at >= :start_date", { start_date: options.start_date });
    if (options.end_date) query.andWhere("benefit.created_at <= :end_date", { end_date: options.end_date });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.orderBy("benefit.created_at", "DESC");
    return await query.getMany();
  }

  public async create(data: Partial<Benefit>): Promise<Benefit> {
    const createBenefit = this.repository.create(data);
    const saveBenefit = await this.repository.save(createBenefit);
    return saveBenefit;
  }

  public async update(id: string, data: Partial<Benefit>): Promise<void> {
    const updateBenefit = this.repository.create(data);
    await this.repository.update(id, updateBenefit);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default BenefitRepository;
