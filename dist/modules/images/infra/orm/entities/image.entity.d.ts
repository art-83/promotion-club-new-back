import Store from "../../../../stores/infra/orm/entities/store.entity";
import Product from "../../../../promotions/infra/orm/entities/product.entity";
declare class Image {
    id: string;
    name: string;
    path: string;
    mimetype: string;
    created_at: Date;
    store: Store;
    product: Product;
}
export default Image;
//# sourceMappingURL=image.entity.d.ts.map