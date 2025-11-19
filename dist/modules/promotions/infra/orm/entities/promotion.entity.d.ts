import Product from "./product.entity";
declare class Promotion {
    id: string;
    is_approved: boolean;
    active: boolean;
    discount_percentage: number;
    expire_at: Date;
    final_price: number;
    created_at: Date;
    updated_at: Date;
    product: Product;
}
export default Promotion;
//# sourceMappingURL=promotion.entity.d.ts.map