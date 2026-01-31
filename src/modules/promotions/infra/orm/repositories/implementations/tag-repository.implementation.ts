import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Tags from "../../entities/tag.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import TagQueryOptionDTO from "../../../../dtos/tags/tag-query-options.dto";

class TagRepository implements RepositoryProvider<Tags> {
  private repository: Repository<Tags>;

  constructor() {
    this.repository = dataSource.getRepository(Tags);
  }

  public async find(options: Partial<TagQueryOptionDTO>): Promise<Tags[]> {
    const query = this.repository.createQueryBuilder("tags");

    if (options.id) query.andWhere("tags.id = :id", { id: options.id });
    if (options.name) query.andWhere("tags.name ILIKE :name", { name: `%${options.name}%` });

    query.andWhere("tags.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<Tags>): Promise<Tags> {
    const createTag = this.repository.create(data);
    const saveTag = await this.repository.save(createTag);
    return saveTag;
  }

  public async update(id: string, data: Partial<Tags>): Promise<void> {
    const updateStore = this.repository.create(data);
    await this.repository.update(id, updateStore);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default TagRepository;
