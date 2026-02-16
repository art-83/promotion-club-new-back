import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import BenefitTier from "../../infra/orm/entities/benefit-tier.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class UpdateBenefitTierService {
  constructor(
    @inject("BenefitTierRepository")
    private benefitTierRepository: RepositoryProvider<BenefitTier>
  ) {}

  public async execute(id: string, data: Partial<BenefitTier>): Promise<void> {
    const benefitTier = (await this.benefitTierRepository.find({ id })).at(0);
    if (!benefitTier) throw new AppError(404, "Benefit tier not found.");
    await this.benefitTierRepository.update(id, data);
  }
}

export default UpdateBenefitTierService;
