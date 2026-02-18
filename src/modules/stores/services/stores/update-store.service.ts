import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../../infra/orm/entities/store.entity";
import File from "../../../files/infra/orm/entities/file.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateStoreDTO from "../../dtos/stores/create-or-update-store.dto";

@injectable()
class UpdateStoreService {
  constructor(
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("FileRepository")
    private fileRepository: RepositoryProvider<File>
  ) {}

  public async execute(id: string, data: CreateOrUpdateStoreDTO): Promise<void> {
    if (data.file_id) {
      const file = (await this.fileRepository.find({ id: data.file_id })).at(0);
      if (!file) throw new AppError(404, "File not found");
      data.file = file;
    }

    await this.storeRepository.update(id, data);
  }
}

export default UpdateStoreService;
