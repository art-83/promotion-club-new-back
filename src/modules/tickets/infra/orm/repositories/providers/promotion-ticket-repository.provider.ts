import DefaultQueryOptions from "../../../../../../shared/infra/orm/dtos/default-query-options.dto";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import GeneralPromotionTicketDashboardDTO from "../../../../dtos/dashboards/general-promotion-ticket-dashboard.dto";
import PromotionTicketDashboardDTO from "../../../../dtos/dashboards/promotion-ticket-dashboard.dto";
import PromotionTicketQueryOptionsDTO from "../../../../dtos/promotion-ticket-query-options.dto";
import PromotionTicket from "../../entities/promotion-ticket.entity";

interface PromotionTicketRepositoryProvider extends RepositoryProvider<PromotionTicket> {
  getCountDashboardByStore(store_id: string, options: Partial<DefaultQueryOptions>): Promise<PromotionTicketDashboardDTO>;
  getGeneralCountDashboard(options: Partial<DefaultQueryOptions>): Promise<GeneralPromotionTicketDashboardDTO>;
  getFullDashboardByUser(
    user_id: string,
    options: Partial<PromotionTicketQueryOptionsDTO>
  ): Promise<{ promotionTickets: PromotionTicket[]; total_money_saved: number; total_tickets: number }>;
}

export default PromotionTicketRepositoryProvider;
