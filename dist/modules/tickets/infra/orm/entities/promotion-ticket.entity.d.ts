import User from "../../../../users/infra/orm/entities/user.entity";
declare class PromotionTicket {
    id: string;
    product_name: string;
    product_price: number;
    promotion_discount_percentage: number;
    promotion_final_price: number;
    saved_money: number;
    created_at: Date;
    user: User;
}
export default PromotionTicket;
//# sourceMappingURL=promotion-ticket.entity.d.ts.map