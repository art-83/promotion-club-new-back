import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Tag from "../../infra/orm/entities/tag.entity";
import TagQueryOptionDTO from "../../dtos/tags/tag-query-options.dto";

@injectable()
class ShowTagsService {
  constructor(
    @inject("TagRepository")
    private tagRepository: RepositoryProvider<Tag>
  ) {}

  public async execute(options: Partial<TagQueryOptionDTO>): Promise<Tag[]> {
    return await this.tagRepository.find(options);
  }
}

export default ShowTagsService;
