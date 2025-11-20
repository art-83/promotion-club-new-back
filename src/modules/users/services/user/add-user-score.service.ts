import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class AddUserScoreService {
  constructor(
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>
  ) {}

  public async excecute(id: string, scoreToAdd: number): Promise<void> {
    const user = (await this.userRepository.find({ id: id })).at(0);
    if (!user) throw new AppError(404, "User not found.");
    const newScore = user.score + scoreToAdd;
    await this.userRepository.update(id, { score: newScore });
  }
}
