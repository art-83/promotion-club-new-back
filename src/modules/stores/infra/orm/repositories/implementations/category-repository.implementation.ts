import { Repository } from "typeorm";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Category from "../../entities/category.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import CategoryQueryOptionsDto from "../../../../dtos/categories/category-query-options.dto";
import CreateCategoryDto from "../../../../dtos/categories/create-category.dto";

class CategoryRepository implements RepositoryProvider<Category> {
  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  public async find(options: Partial<CategoryQueryOptionsDto>): Promise<Category[]> {
    const query = this.repository.createQueryBuilder("categories");

    if (options.id) query.andWhere("categories.id = :id", { id: options.id });
    if (options.name) query.andWhere("categories.name ILIKE :name", { name: `%${options.name}%` });
    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.andWhere("categories.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<CreateCategoryDto>): Promise<Category> {
    const category = this.repository.create(data);
    return await this.repository.save(category);
  }

  public async update(id: string, data: Partial<Category>): Promise<void> {
    await this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default CategoryRepository;
