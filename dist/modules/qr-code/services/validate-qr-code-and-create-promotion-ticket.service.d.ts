import CacheProvider from "../../../shared/infra/cache/providers/cache.provider";
import CreateQrCodeDTO from "../dtos/create-qr-code.dto";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionTicket from "../../tickets/infra/orm/entities/promotion-ticket.entity";
import User from "../../users/infra/orm/entities/user.entity";
import Promotion from "../../promotions/infra/orm/entities/promotion.entity";
declare class ValidateQrCodeAndCreatePromotionTicketService {
    private cache;
    private promotionTicketRepository;
    private userRepository;
    private promotionRepository;
    constructor(cache: CacheProvider<CreateQrCodeDTO>, promotionTicketRepository: RepositoryProvider<PromotionTicket>, userRepository: RepositoryProvider<User>, promotionRepository: RepositoryProvider<Promotion>);
    execute(user_id: string): Promise<{
        message: string;
        createPromotionTicket: Partial<PromotionTicket>;
    }>;
}
export default ValidateQrCodeAndCreatePromotionTicketService;
//# sourceMappingURL=validate-qr-code-and-create-promotion-ticket.service.d.ts.map