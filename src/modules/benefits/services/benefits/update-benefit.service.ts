import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Benefit from "../../infra/orm/entities/benefit.entity";
import ImageRepositoryProvider from "../../../images/infra/orm/repositories/providers/image-repository.provider";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateBenefitsDTO from "../../dtos/benefits/create-or-update-benefits.dto";

@injectable()
class UpdateBenefitService {
  constructor(
    @inject("BenefitRepository")
    private benefitRepository: RepositoryProvider<Benefit>,
    @inject("ImageRepository")
    private imageRepository: ImageRepositoryProvider
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdateBenefitsDTO>): Promise<void> {
    const benefit = (await this.benefitRepository.find({ id })).at(0);
    if (!benefit) throw new AppError(404, "Benefit not found.");

    if (data.image_id) {
      const image = (await this.imageRepository.find({ id: data.image_id })).at(0);
      if (!image) throw new AppError(404, "Image not found.");
      data.image = image;
    }

    await this.benefitRepository.update(id, data);
  }
}

export default UpdateBenefitService;
