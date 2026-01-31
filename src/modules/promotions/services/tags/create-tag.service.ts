import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Tag from "../../infra/orm/entities/tag.entity";
import Store from "../../../stores/infra/orm/entities/store.entity";
import CreateTagDTO from "../../dtos/tags/create-tag.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreateTagService {
  constructor(
    @inject("TagRepository")
    private tagRepository: RepositoryProvider<Tag>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(data: Partial<CreateTagDTO>): Promise<Tag> {
    if (data.store_id) {
      const store = (await this.storeRepository.find({ id: data.store_id })).at(0);
      if (!store) throw new AppError(404, "Store not found.");
      data.store = store;
    }

    const tagName = data.name;
    if (tagName) data.name = tagName.trim().toUpperCase();
    return await this.tagRepository.create(data);
  }
}

export default CreateTagService;
