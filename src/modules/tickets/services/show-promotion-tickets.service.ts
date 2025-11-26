import { injectable, inject } from "tsyringe";
import PromotionTicket from "../infra/orm/entities/promotion-ticket.entity";
import PromotionTicketRepositoryProvider from "../infra/orm/repositories/providers/promotion-ticket-repository.provider";
import PromotionTicketQueryOptionsDTO from "../dtos/promotion-ticket-query-options.dto";

@injectable()
class ShowPromotionTicketsService {
  constructor(
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: PromotionTicketRepositoryProvider,
  ) {}

  public async execute(options: Partial<PromotionTicketQueryOptionsDTO>): Promise<PromotionTicket[]> {
    const tickets = await this.promotionTicketRepository.find(options);
    return tickets;
  }
}

export default ShowPromotionTicketsService;
