import Promotion from "./promotion.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import Image from "../../../../images/infra/orm/entities/image.entity";
declare class Product {
    id: string;
    name: string;
    price: number;
    created_at: Date;
    updated_at: Date;
    store: Store;
    image: Image;
    promotion: Promotion;
}
export default Product;
//# sourceMappingURL=product.entity.d.ts.map