import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Benefit from "../../infra/orm/entities/benefit.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class DeleteBenefitService {
  constructor(
    @inject("BenefitRepository")
    private benefitRepository: RepositoryProvider<Benefit>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.benefitRepository.delete(id);
  }
}

export default DeleteBenefitService;
