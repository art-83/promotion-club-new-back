import { inject, injectable } from "tsyringe";
import File from "../infra/orm/entities/file.entity";
import FileRepositoryProvider from "../infra/orm/repositories/providers/file-repository.provider";
import CreateFileDTO from "../dtos/create-file.dto";
import AppError from "../../../shared/infra/http/errors/app-error";

@injectable()
class CreateFileService {
  constructor(
    @inject("FileRepository")
    private fileRepository: FileRepositoryProvider
  ) {}

  public async execute(data: CreateFileDTO) {
    if (!data.file) throw new AppError(400, "File not provided.");

    const file = await this.fileRepository.create({
      name: data.file.originalname,
      path: data.file.filename,
      mimetype: data.file.mimetype,
    });

    return file;
  }
}

export default CreateFileService;
