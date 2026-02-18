import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserBenefit from "../../infra/orm/entities/user-benefit.entity";
import User from "../../../users/infra/orm/entities/user.entity";
import Benefit from "../../infra/orm/entities/benefit.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateUserBenefitsDTO from "../../dtos/user-benefits/create-or-update-user-benefits.dto";
import BenefitTier from "../../infra/orm/entities/benefit-tier.entity";
import BenefitsQueryOptionsDTO from "../../dtos/benefits/benefits-query-options.dto";
import UserRepositoryProvider from "../../../users/infra/orm/repositories/providers/user-repository.provider";

@injectable()
class CreateUserBenefitService {
  constructor(
    @inject("UserBenefitRepository")
    private userBenefitRepository: RepositoryProvider<UserBenefit>,
    @inject("UserRepository")
    private userRepository: UserRepositoryProvider,
    @inject("BenefitRepository")
    private benefitRepository: RepositoryProvider<Benefit>
  ) {}

  public async execute(data: Partial<CreateOrUpdateUserBenefitsDTO>): Promise<UserBenefit> {

    const userId = String(data.user_id);

    const benefitQueryOptions = {
      id: data.benefit_id,
      join_benefit_tier: true,
    } as BenefitsQueryOptionsDTO;

    const [user, userTotalSpent, benefit] = await Promise.all([
      (await this.userRepository.find({ id: userId })).at(0),
      this.userRepository.totalSpentByUser(userId),
      (await this.benefitRepository.find(benefitQueryOptions)).at(0),
    ]);

    if (!user) throw new AppError(404, "User not found.", "Usuário não encontrado.");
    if (!benefit) throw new AppError(404, "Benefit not found.", "Benefício não encontrado.");
    
    if (Number(user.points) < Number(benefit.points_required)) throw new AppError(400, "User does not have enough points to claim this benefit.", "O usuário não tem pontos suficientes para resgatar este benefício.");
    if (Number(userTotalSpent) < Number(benefit.points_required)) throw new AppError(400, "User does not have enough spent to claim this benefit.", "O usuário não tem gasto suficiente para resgatar este benefício.");
    
    data.user = user;
    data.benefit = benefit;

    const newPoints = Number(Number(user.points) - Number(benefit.points_required));

    const [updateUser, createUserBenefit] = await Promise.all([
      this.userRepository.update(user.id, { points: newPoints }),
      this.userBenefitRepository.create(data),
    ]);

    return createUserBenefit;
  }
}

export default CreateUserBenefitService;
