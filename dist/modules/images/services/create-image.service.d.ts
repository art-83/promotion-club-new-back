import Image from "../infra/orm/entities/image.entity";
import ImageRepositoryProvider from "../infra/orm/repositories/provider/image-repository.provider";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../promotions/infra/orm/entities/product.entity";
import CreateImageDTO from "../dtos/create-image.dto";
declare class CreateImageService {
    private imageRepository;
    private productRepository;
    constructor(imageRepository: ImageRepositoryProvider, productRepository: RepositoryProvider<Product>);
    execute(data: CreateImageDTO): Promise<Image>;
}
export default CreateImageService;
//# sourceMappingURL=create-image.service.d.ts.map