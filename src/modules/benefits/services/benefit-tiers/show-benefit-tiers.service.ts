import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import BenefitTier from "../../infra/orm/entities/benefit-tier.entity";

@injectable()
class ShowBenefitTiersService {
  constructor(
    @inject("BenefitTierRepository")
    private benefitTierRepository: RepositoryProvider<BenefitTier>
  ) {}

  public async execute(query: Record<string, unknown>): Promise<BenefitTier[]> {
    const options: Partial<BenefitTier> = {};
    if (query.id) options.id = String(query.id);
    if (query.name) options.name = String(query.name);
    if (query.minimum_score !== undefined) options.minimum_score = Number(query.minimum_score);
    if (query.maximum_score !== undefined) options.maximum_score = Number(query.maximum_score);
    return await this.benefitTierRepository.find(options);
  }
}

export default ShowBenefitTiersService;
