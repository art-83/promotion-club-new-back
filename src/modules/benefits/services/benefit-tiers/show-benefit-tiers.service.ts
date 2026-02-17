import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import BenefitTier from "../../infra/orm/entities/benefit-tier.entity";

@injectable()
class ShowBenefitTiersService {
  constructor(
    @inject("BenefitTierRepository")
    private benefitTierRepository: RepositoryProvider<BenefitTier>
  ) {}

  public async execute(options: Partial<BenefitTier>): Promise<BenefitTier[]> {
    return await this.benefitTierRepository.find(options);
  }
}

export default ShowBenefitTiersService;
