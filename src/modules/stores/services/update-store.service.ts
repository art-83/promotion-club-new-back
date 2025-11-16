import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";

@injectable()
class UpdateStoreService {
  constructor(
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(id: string, data: Partial<Store>): Promise<void> {
    await this.storeRepository.update(id, data);
  }
}

export default UpdateStoreService;
