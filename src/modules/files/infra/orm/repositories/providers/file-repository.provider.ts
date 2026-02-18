import File from "../../entities/file.entity";

interface FileRepositoryProvider {
  create(data: Partial<File>): Promise<File>;
  find(options: Partial<File>): Promise<File[]>;
}

export default FileRepositoryProvider;
