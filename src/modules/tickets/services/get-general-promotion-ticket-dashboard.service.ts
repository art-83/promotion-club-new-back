import { inject, injectable } from "tsyringe";
import GeneralPromotionTicketDashboardDTO from "../dtos/dashboards/general-promotion-ticket-dashboard.dto";
import DefaultQueryOptions from "../../../shared/infra/orm/dtos/default-query-options.dto";
import PromotionTicketRepositoryProvider from "../infra/orm/repositories/providers/promotion-ticket-repository.provider";

@injectable()
class GetGeneralPromotionTicketDashboardService {
  constructor(
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: PromotionTicketRepositoryProvider
  ) {}

  public async execute(options: DefaultQueryOptions): Promise<GeneralPromotionTicketDashboardDTO> {
    return this.promotionTicketRepository.getGeneralCountDashboard(options);
  }
}

export default GetGeneralPromotionTicketDashboardService;
