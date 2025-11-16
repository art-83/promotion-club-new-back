import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";

@injectable()
class CreateStoreService {
  constructor(
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(data: Partial<Store>): Promise<Store> {
    const store = await this.storeRepository.create(data);
    return store;
  }
}

export default CreateStoreService;
