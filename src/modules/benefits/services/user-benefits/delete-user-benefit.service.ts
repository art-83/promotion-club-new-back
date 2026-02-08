import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserBenefit from "../../infra/orm/entities/user-benefit.entity";
import UserBenefitsQueryOptionsDTO from "../../dtos/user-benefits/user-benefits-query-options.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class DeleteUserBenefitService {
  constructor(
    @inject("UserBenefitRepository")
    private userBenefitRepository: RepositoryProvider<UserBenefit>
  ) {}

  public async execute(user_id: string, benefit_id: string): Promise<void> {
    const options = {
      user_id,
      benefit_id,
    } as UserBenefitsQueryOptionsDTO;

    const userBenefit = (await this.userBenefitRepository.find(options)).at(0);

    if (!userBenefit) throw new AppError(404, "User benefit not found.");

    await this.userBenefitRepository.delete(userBenefit.id);
  }
}

export default DeleteUserBenefitService;
