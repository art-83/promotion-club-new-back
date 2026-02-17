import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserBenefit from "../../infra/orm/entities/user-benefit.entity";
import User from "../../../users/infra/orm/entities/user.entity";
import Benefit from "../../infra/orm/entities/benefit.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateUserBenefitsDTO from "../../dtos/user-benefits/create-or-update-user-benefits.dto";

@injectable()
class CreateUserBenefitService {
  constructor(
    @inject("UserBenefitRepository")
    private userBenefitRepository: RepositoryProvider<UserBenefit>,
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("BenefitRepository")
    private benefitRepository: RepositoryProvider<Benefit>
  ) {}

  public async execute(data: Partial<CreateOrUpdateUserBenefitsDTO>): Promise<UserBenefit> {
    const [user, benefit] = await Promise.all([
      (await this.userRepository.find({ id: data.user_id })).at(0),
      (await this.benefitRepository.find({ id: data.benefit_id })).at(0),
    ]);

    if (!user) throw new AppError(404, "User not found.");
    if (!benefit) throw new AppError(404, "Benefit not found.");

    if (user.score < benefit.score_required) throw new AppError(400, "User does not have enough score to claim this benefit.");
      
    data.user = user;
    data.benefit = benefit;

    const newScore = Number(Number(user.score) - Number(benefit.score_required));

    const [updateUser, createUserBenefit] = await Promise.all([
      this.userRepository.update(user.id, { score: newScore }),
      this.userBenefitRepository.create(data),
    ]);

    return createUserBenefit;
  }
}

export default CreateUserBenefitService;
