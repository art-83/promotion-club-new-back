import { Repository } from "typeorm";
import dataSource from "../../../../../../shared/infra/orm/database";
import Image from "../../entities/image.entity";
import ImageRepositoryProvider from "../provider/image-repository.provider";

class ImageRepository implements ImageRepositoryProvider {
  private repository: Repository<Image>;

  constructor() {
    this.repository = dataSource.getRepository(Image);
  }

  public async create(data: Partial<Image>): Promise<Image> {
    const createImage = this.repository.create(data);
    const saveImage = await this.repository.save(createImage);
    return saveImage;
  }
}

export default ImageRepository;
