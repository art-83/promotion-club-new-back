import { Request, Response } from "express";
import { container } from "tsyringe";
import GetTicketDashboardService from "../../../services/get-promotion-ticket-dashboard-by-store.service";
import GetGeneralTicketDashboardService from "../../../services/get-general-promotion-ticket-dashboard.service";
import GetPromotionTicketDashboardTicketByUserStoreService from "../../../services/get-promotion-ticket-dashboard-by-user-store.service";
import ShowPromotionTicketsByUserService from "../../../services/show-promotion-tickets-by-user.service";

class TicketController {
  public async getDashboardByUser(request: Request, response: Response) {
    const user_id = request.user_id;
    const getPromotionTicketDashboardTicketByUserStoreService = container.resolve(GetPromotionTicketDashboardTicketByUserStoreService);
    const dashboardData = await getPromotionTicketDashboardTicketByUserStoreService.execute(user_id, request.query);
    return response.status(200).json(dashboardData);
  }

  public async getDashboardByStore(request: Request, response: Response) {
    const store_id = String(request.params.store_id);
    const getTicketDashboardService = container.resolve(GetTicketDashboardService);
    const dashboardData = await getTicketDashboardService.execute(store_id, request.query);
    return response.status(200).json(dashboardData);
  }

  public async getGeneralDashboard(request: Request, response: Response) {
    const showPromotionTicketsByUserService = container.resolve(GetGeneralTicketDashboardService);
    const dashboardData = await showPromotionTicketsByUserService.execute(request.query);
    return response.status(200).json(dashboardData);
  }

  public async showByUser(request: Request, response: Response) {
    const showPromotionTicketsService = container.resolve(ShowPromotionTicketsByUserService);
    const promotionTickets = await showPromotionTicketsService.execute(request.user_id, request.query);
    return response.status(200).json(promotionTickets);
  }
}

export default TicketController;
