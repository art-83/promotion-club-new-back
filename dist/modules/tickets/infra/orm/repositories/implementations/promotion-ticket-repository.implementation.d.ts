import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionTicket from "../../entities/promotion-ticket.entity";
import PromotionTicketQueryOptionsDTO from "../../../../dtos/promotion-ticket-query-options.dto";
declare class PromotionTicketRepository implements RepositoryProvider<PromotionTicket> {
    private repository;
    constructor();
    find(options: PromotionTicketQueryOptionsDTO): Promise<PromotionTicket[]>;
    create(data: Partial<PromotionTicket>): Promise<PromotionTicket>;
    update(id: string, data: Partial<PromotionTicket>): Promise<void>;
    delete(id: string): Promise<void>;
}
export default PromotionTicketRepository;
//# sourceMappingURL=promotion-ticket-repository.implementation.d.ts.map