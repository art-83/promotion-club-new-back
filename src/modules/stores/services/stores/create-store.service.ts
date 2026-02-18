import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../../infra/orm/entities/store.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import FileRepositoryProvider from "../../../files/infra/orm/repositories/providers/file-repository.provider";
import CreateStoreDTO from "../../dtos/stores/create-or-update-store.dto";

@injectable()
class CreateStoreService {
  constructor(
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("FileRepository")
    private fileRepository: FileRepositoryProvider
  ) {}

  public async execute(data: CreateStoreDTO): Promise<Store> {
    if (data.file_id) {
      const file = (await this.fileRepository.find({ id: data.file_id })).at(0);
      if (!file) throw new AppError(404, "File not found", "Arquivo não encontrado.");
      data.file = file;
    }

    const store = await this.storeRepository.create(data);
    return store;
  }
}

export default CreateStoreService;
