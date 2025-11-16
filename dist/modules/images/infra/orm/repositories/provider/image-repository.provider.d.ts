import Image from "../../entities/image.entity";
interface ImageRepositoryProvider {
    create(data: Partial<Image>): Promise<Image>;
}
export default ImageRepositoryProvider;
//# sourceMappingURL=image-repository.provider.d.ts.map