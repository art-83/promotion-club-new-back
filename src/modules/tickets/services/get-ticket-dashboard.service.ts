import { inject, injectable } from "tsyringe";
import PromotionTickerDashboardDTO from "../dtos/dashboards/promotion-ticket-dashboard.dto";
import PromotionTicketRepository from "../infra/orm/repositories/implementations/promotion-ticket-repository.implementation";

@injectable()
class GetTicketDashboardService {
  constructor(
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: PromotionTicketRepository
  ) {}

  public async execute(store_id: string): Promise<PromotionTickerDashboardDTO> {
    return this.promotionTicketRepository.getCountDashboardByStore(store_id);
  }
}

export default GetTicketDashboardService;
