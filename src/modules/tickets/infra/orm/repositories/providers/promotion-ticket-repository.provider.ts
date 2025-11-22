import DefaultQueryOptions from "../../../../../../shared/infra/orm/dtos/default-query-options.dto";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import GeneralPromotionTicketDashboardDTO from "../../../../dtos/dashboards/general-promotion-ticket-dashboard.dto";
import PromotionTickerDashboardDTO from "../../../../dtos/dashboards/promotion-ticket-dashboard.dto";
import PromotionTicket from "../../entities/promotion-ticket.entity";

interface PromotionTicketRepositoryProviders extends RepositoryProvider<PromotionTicket> {
  getCountDashboardByStore(store_id: string): Promise<PromotionTickerDashboardDTO>;
  getGeneralCountDashboard(options: DefaultQueryOptions): Promise<GeneralPromotionTicketDashboardDTO>;
}

export default PromotionTicketRepositoryProviders;
