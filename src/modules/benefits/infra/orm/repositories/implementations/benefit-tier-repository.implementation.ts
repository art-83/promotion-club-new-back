import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import BenefitTier from "../../entities/benefit-tier.entity";
import dataSource from "../../../../../../shared/infra/orm/database";

class BenefitTierRepository implements RepositoryProvider<BenefitTier> {
  private repository: Repository<BenefitTier>;

  constructor() {
    this.repository = dataSource.getRepository(BenefitTier);
  }

  public async find(options: Partial<BenefitTier>): Promise<BenefitTier[]> {
    const query = this.repository.createQueryBuilder("benefit_tier");
    if (options.id) query.andWhere("benefit_tier.id = :id", { id: options.id });
    if (options.name) query.andWhere("benefit_tier.name = :name", { name: options.name });
    if (options.minimum_points) query.andWhere("benefit_tier.minimum_points = :minimum_points", { minimum_points: options.minimum_points });
    if (options.maximum_points) query.andWhere("benefit_tier.maximum_points = :maximum_points", { maximum_points: options.maximum_points });
    if (options.description) query.andWhere("benefit_tier.description = :description", { description: options.description });
    query.andWhere("benefit_tier.deleted_at IS NULL");
    return await query.getMany();
  }

  public async create(data: Partial<BenefitTier>): Promise<BenefitTier> {
    const benefitTier = this.repository.create(data);
    return await this.repository.save(benefitTier);
  }

  public async update(id: string, data: Partial<BenefitTier>): Promise<void> {
    const updateBenefitTier = this.repository.create(data);
    await this.repository.update(id, updateBenefitTier);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default BenefitTierRepository;
