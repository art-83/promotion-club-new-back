import CreateImageDTO from "../../../../dtos/create-image.dto";
import Image from "../../entities/image.entity";

interface ImageRepositoryProvider {
  create(data: Partial<Image>): Promise<Image>;
  find(options: Partial<Image>): Promise<Image[]>;
}

export default ImageRepositoryProvider;
