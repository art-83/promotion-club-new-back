import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Benefit from "../../infra/orm/entities/benefit.entity";
import BenefitsQueryOptionsDTO from "../../dtos/benefits/benefits-query-options.dto";

@injectable()
class ShowBenefitsService {
  constructor(
    @inject("BenefitRepository")
    private benefitRepository: RepositoryProvider<Benefit>
  ) {}

  public async execute(options: Partial<BenefitsQueryOptionsDTO>): Promise<Benefit[]> {
    return await this.benefitRepository.find(options);
  }
}

export default ShowBenefitsService;
