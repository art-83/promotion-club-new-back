import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Benefit from "../../infra/orm/entities/benefit.entity";
import BenefitTier from "../../infra/orm/entities/benefit-tier.entity";
import FileRepositoryProvider from "../../../files/infra/orm/repositories/providers/file-repository.provider";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateBenefitsDTO from "../../dtos/benefits/create-or-update-benefits.dto";

@injectable()
class UpdateBenefitService {
  constructor(
    @inject("BenefitRepository")
    private benefitRepository: RepositoryProvider<Benefit>,
    @inject("BenefitTierRepository")
    private benefitTierRepository: RepositoryProvider<BenefitTier>,
    @inject("FileRepository")
    private fileRepository: FileRepositoryProvider
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdateBenefitsDTO>): Promise<void> {
    const benefit = (await this.benefitRepository.find({ id })).at(0);
    if (!benefit) throw new AppError(404, "Benefit not found.", "Benefício não encontrado.");

    if (data.benefit_tier_id) {
      const benefitTier = (await this.benefitTierRepository.find({ id: data.benefit_tier_id })).at(0);
      if (!benefitTier) throw new AppError(404, "Benefit tier not found.", "Nível de benefício não encontrado.");
      data.benefit_tier = benefitTier;
    }

    if (data.file_id) {
      const file = (await this.fileRepository.find({ id: data.file_id })).at(0);
      if (!file) throw new AppError(404, "File not found.", "Arquivo não encontrado.");
      data.file = file;
    }

    await this.benefitRepository.update(id, data);
  }
}

export default UpdateBenefitService;
