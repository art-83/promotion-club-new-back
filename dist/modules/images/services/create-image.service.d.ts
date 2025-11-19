import Image from "../infra/orm/entities/image.entity";
import ImageRepositoryProvider from "../infra/orm/repositories/provider/image-repository.provider";
import CreateImageDTO from "../dtos/create-image.dto";
declare class CreateImageService {
    private imageRepository;
    constructor(imageRepository: ImageRepositoryProvider);
    execute(data: CreateImageDTO): Promise<Image>;
}
export default CreateImageService;
//# sourceMappingURL=create-image.service.d.ts.map