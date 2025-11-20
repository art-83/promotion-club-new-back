import Product from "../../../../promotions/infra/orm/entities/product.entity";
import Image from "../../../../images/infra/orm/entities/image.entity";
import UserPermissions from "../../../../users/infra/orm/entities/user-permissions.entity";
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
    products: Product[];
    user_permissions: UserPermissions[];
}
export default Store;
//# sourceMappingURL=store.entity.d.ts.map