import { inject, injectable } from "tsyringe";
import StoreQueryOptionsDTO from "../../dtos/stores/store-query-options.dto";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../../infra/orm/entities/store.entity";

@injectable()
class ShowStoresServices {
  constructor(
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(options: Partial<StoreQueryOptionsDTO>): Promise<Store[]> {
    return await this.storeRepository.find(options);
  }
}

export default ShowStoresServices;
