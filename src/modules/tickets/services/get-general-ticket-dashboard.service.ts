import { inject, injectable } from "tsyringe";
import GeneralPromotionTicketDashboardDTO from "../dtos/dashboards/general-promotion-ticket-dashboard.dto";
import PromotionTicketRepository from "../infra/orm/repositories/implementations/promotion-ticket-repository.implementation";
import DefaultQueryOptions from "../../../shared/infra/orm/dtos/default-query-options.dto";

@injectable()
class GetGeneralTicketDashboardService {
  constructor(
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: PromotionTicketRepository
  ) {}

  public async execute(options: DefaultQueryOptions): Promise<GeneralPromotionTicketDashboardDTO> {
    return this.promotionTicketRepository.getGeneralCountDashboard(options);
  }
}

export default GetGeneralTicketDashboardService;
