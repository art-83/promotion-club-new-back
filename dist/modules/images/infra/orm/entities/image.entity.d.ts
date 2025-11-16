import Product from "../../../../promotions/infra/orm/entities/product.entity";
declare class Image {
    id: string;
    name: string;
    path: string;
    mimetype: string;
    created_at: Date;
    product: Product;
}
export default Image;
//# sourceMappingURL=image.entity.d.ts.map