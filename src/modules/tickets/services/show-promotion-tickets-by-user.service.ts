import { injectable, inject } from "tsyringe";
import PromotionTicket from "../infra/orm/entities/promotion-ticket.entity";
import PromotionTicketRepositoryProvider from "../infra/orm/repositories/providers/promotion-ticket-repository.provider";
import PromotionTicketQueryOptionsDTO from "../dtos/promotion-ticket-query-options.dto";

@injectable()
class ShowPromotionTicketsByUserService {
  constructor(
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: PromotionTicketRepositoryProvider
  ) {}

  public async execute(
    user_id: string,
    options: Partial<PromotionTicketQueryOptionsDTO>
  ): Promise<{ promotion_tickets: PromotionTicket[]; total_money_saved: number; total_tickets: number }> {
    const promotionTicketQueryOption = {
      user_id,
      store_id: options.store_id,
      start_date: options.start_date,
      end_date: options.end_date,
      offset: options.offset,
      limit: options.limit,
      promotion_name: options.promotion_name,
    } as PromotionTicketQueryOptionsDTO;
    return this.promotionTicketRepository.getFullDashboardByUser(user_id, promotionTicketQueryOption);
  }
}

export default ShowPromotionTicketsByUserService;
