import Image from "../../entities/image.entity";
import ImageRepositoryProvider from "../provider/image-repository.provider";
declare class ImageRepository implements ImageRepositoryProvider {
    private repository;
    constructor();
    create(data: Partial<Image>): Promise<Image>;
    find(options: Partial<Image>): Promise<Image[]>;
}
export default ImageRepository;
//# sourceMappingURL=image-repository.implementation.d.ts.map