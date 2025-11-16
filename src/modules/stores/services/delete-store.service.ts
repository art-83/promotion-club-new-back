import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";

@injectable()
class DeleteStoreService {
  constructor(
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.storeRepository.delete(id);
  }
}

export default DeleteStoreService;
