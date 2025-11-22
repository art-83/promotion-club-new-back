import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionTickerDashboardDTO from "../../../../dtos/dashboards/promotion-ticket-dashboard.dto";
import PromotionTicket from "../../entities/promotion-ticket.entity";

interface PromotionTicketRepositoryProviders extends RepositoryProvider<PromotionTicket> {
  getCountDashboardByStore(store_id: string): Promise<PromotionTickerDashboardDTO>;
}

export default PromotionTicketRepositoryProviders;
