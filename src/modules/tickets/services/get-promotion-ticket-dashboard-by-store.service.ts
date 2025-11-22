import { inject, injectable } from "tsyringe";
import PromotionTickerDashboardDTO from "../dtos/dashboards/promotion-ticket-dashboard.dto";
import DefaultQueryOptions from "../../../shared/infra/orm/dtos/default-query-options.dto";
import PromotionTicketRepositoryProvider from "../infra/orm/repositories/providers/promotion-ticket-repository.provider";

@injectable()
class GetPromotionTicketDashboardService {
  constructor(
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: PromotionTicketRepositoryProvider
  ) {}

  public async execute(store_id: string, options: DefaultQueryOptions): Promise<PromotionTickerDashboardDTO> {
    return this.promotionTicketRepository.getCountDashboardByStore(store_id, options);
  }
}

export default GetPromotionTicketDashboardService;
