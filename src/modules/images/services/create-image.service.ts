import { inject, injectable } from "tsyringe";
import Image from "../infra/orm/entities/image.entity";
import ImageRepositoryProvider from "../infra/orm/repositories/provider/image-repository.provider";
import CreateImageDTO from "../dtos/create-image.dto";
import AppError from "../../../shared/infra/http/errors/app-error";
@injectable()
class CreateImageService {
  constructor(
    @inject("ImageRepository")
    private imageRepository: ImageRepositoryProvider
  ) {}

  public async execute(data: CreateImageDTO): Promise<Image> {
    if (!data.file) throw new AppError(400, "Image not provided.");

    const image = await this.imageRepository.create({
      name: data.file.originalname,
      path: data.file.filename,
      mimetype: data.file.mimetype,
    });

    return image;
  }
}

export default CreateImageService;
