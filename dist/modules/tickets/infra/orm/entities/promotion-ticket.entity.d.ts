import User from "../../../../users/infra/orm/entities/user.entity";
import Promotion from "../../../../promotions/infra/orm/entities/promotion.entity";
declare class PromotionTicket {
    id: string;
    saved_money: number;
    created_at: Date;
    user: User;
    promotion: Promotion;
}
export default PromotionTicket;
//# sourceMappingURL=promotion-ticket.entity.d.ts.map