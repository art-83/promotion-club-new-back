import User from "../../../../users/infra/orm/entities/user.entity";
import Product from "../../../../promotions/infra/orm/entities/product.entity";
import Image from "../../../../images/infra/orm/entities/image.entity";
declare class Store {
    id: string;
    name: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: string;
    created_at: Date;
    updated_at: Date;
    image: Image;
    users: User[];
    products: Product[];
}
export default Store;
//# sourceMappingURL=store.entity.d.ts.map