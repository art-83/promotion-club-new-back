import { Repository } from "typeorm";
import dataSource from "../../../../../../shared/infra/orm/database";
import File from "../../entities/file.entity";
import FileRepositoryProvider from "../providers/file-repository.provider";

class FileRepository implements FileRepositoryProvider {
  private repository: Repository<File>;

  constructor() {
    this.repository = dataSource.getRepository(File);
  }

  public async create(data: Partial<File>): Promise<File> {
    const createFile = this.repository.create(data);
    const saveFile = await this.repository.save(createFile);
    return saveFile;
  }

  public async find(options: Partial<File>): Promise<File[]> {
    const query = this.repository.createQueryBuilder("file");

    query.andWhere("file.id = :id", { id: options.id });

    query.andWhere("file.deleted_at IS NULL");

    return await query.getMany();
  }
}

export default FileRepository;
