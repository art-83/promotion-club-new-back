import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Benefit from "../../entities/benefit.entity";
import { Repository } from "typeorm";
import dataSource from "../../../../../../shared/infra/orm/database";

class BenefitsRepository implements RepositoryProvider<Benefit> {
  private repository: Repository<Benefit>;

  constructor() {
    this.repository = dataSource.getRepository(Benefit);
  }

  public async find(options: Partial<Benefit>): Promise<Benefit[]> {
    const query = this.repository.createQueryBuilder("benefit");
    if (options.id) query.andWhere("benefit.id = :id", { id: options.id });

    query.andWhere("benefit.deleted_at IS NULL");

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

export default BenefitsRepository;
