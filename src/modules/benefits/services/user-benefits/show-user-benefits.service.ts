import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserBenefit from "../../infra/orm/entities/user-benefit.entity";
import UserBenefitsQueryOptionsDTO from "../../dtos/user-benefits/user-benefits-query-options.dto";

@injectable()
class ShowUserBenefitsServiceByUser {
  constructor(
    @inject("UserBenefitRepository")
    private userBenefitRepository: RepositoryProvider<UserBenefit>
  ) {}

  public async execute(user_id: string, options: Partial<UserBenefitsQueryOptionsDTO>): Promise<UserBenefit[]> {
    options.user_id = user_id;
    const userBenefits = await this.userBenefitRepository.find(options);
    return userBenefits;
  }
}

export default ShowUserBenefitsServiceByUser;
