import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Benefit from "../../infra/orm/entities/benefit.entity";
import BenefitTier from "../../infra/orm/entities/benefit-tier.entity";
import FileRepositoryProvider from "../../../files/infra/orm/repositories/providers/file-repository.provider";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateBenefitsDTO from "../../dtos/benefits/create-or-update-benefits.dto";

@injectable()
class CreateBenefitService {
  constructor(
    @inject("BenefitRepository")
    private benefitRepository: RepositoryProvider<Benefit>,
    @inject("BenefitTierRepository")
    private benefitTierRepository: RepositoryProvider<BenefitTier>,
    @inject("FileRepository")
    private fileRepository: FileRepositoryProvider
  ) {}

  public async execute(data: Partial<CreateOrUpdateBenefitsDTO>): Promise<Benefit> {
    const benefitTier = (await this.benefitTierRepository.find({ id: data.benefit_tier_id })).at(0);
    if (!benefitTier) throw new AppError(404, "Benefit tier not found.");
    data.benefit_tier = benefitTier;

    if (data.file_id) {
      const file = (await this.fileRepository.find({ id: data.file_id })).at(0);
      if (!file) throw new AppError(404, "File not found.");
      data.file = file;
    }
    return await this.benefitRepository.create(data);
  }
}

export default CreateBenefitService;
