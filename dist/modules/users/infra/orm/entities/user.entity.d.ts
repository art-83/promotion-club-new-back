import UserPermissions from "./user-permissions.entity";
import PromotionTicket from "../../../../tickets/infra/orm/entities/promotion-ticket.entity";
declare class User {
    id: string;
    name: string;
    password: string;
    email: string;
    cpf: string;
    score: number;
    created_at: Date;
    updated_at: Date;
    user_permissions: UserPermissions;
    promotional_ticket: PromotionTicket[];
}
export default User;
//# sourceMappingURL=user.entity.d.ts.map