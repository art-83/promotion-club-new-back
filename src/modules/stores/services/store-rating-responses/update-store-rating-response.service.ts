import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRatingResponse from "../../infra/orm/entities/store-rating-response.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateStoreRatingResponseDto from "../../dtos/store-rating-responses/create-or-update-store-rating-response.dto";

@injectable()
class UpdateStoreRatingResponseService {
  constructor(
    @inject("StoreRatingResponseRepository")
    private storeRatingResponseRepository: RepositoryProvider<StoreRatingResponse>
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdateStoreRatingResponseDto>): Promise<void> {
    const storeRatingResponse = (await this.storeRatingResponseRepository.find({ id })).at(0);
    if (!storeRatingResponse) throw new AppError(404, "Store rating response not found.", "Resposta à avaliação da loja não encontrada.");
    await this.storeRatingResponseRepository.update(id, data);
  }
}

export default UpdateStoreRatingResponseService;
