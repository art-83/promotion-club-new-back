import { injectable, inject } from "tsyringe";
import PromotionTicket from "../infra/orm/entities/promotion-ticket.entity";
import PromotionTicketRepositoryProvider from "../infra/orm/repositories/providers/promotion-ticket-repository.provider";
import PromotionTicketQueryOptionsDTO from "../dtos/promotion-ticket-query-options.dto";
import PromotionTicketDashboardDTO from "../dtos/dashboards/promotion-ticket-dashboard.dto";
import GeneralPromotionTicketDashboardDTO from "../dtos/dashboards/general-promotion-ticket-dashboard.dto";

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
      product_name: options.product_name,
      start_date: options.start_date,
      end_date: options.end_date,
      offset: options.offset,
      limit: options.limit,
      store_id: options.store_id,
    } as PromotionTicketQueryOptionsDTO;
    const tickets = await this.promotionTicketRepository.getFullDashboardByUser(user_id, promotionTicketQueryOption);
    return tickets;
  }
}

export default ShowPromotionTicketsByUserService;
