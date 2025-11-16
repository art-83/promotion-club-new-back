import Product from "./product.entity";
import PromotionTicket from "../../../../tickets/infra/orm/entities/promotion-ticket.entity";
declare class Promotion {
    id: string;
    is_approved: boolean;
    discount_percentage: number;
    expire_at: Date;
    final_price: number;
    created_at: Date;
    updated_at: Date;
    product: Product;
    promotion_tickets: PromotionTicket[];
}
export default Promotion;
//# sourceMappingURL=promotion.entity.d.ts.map