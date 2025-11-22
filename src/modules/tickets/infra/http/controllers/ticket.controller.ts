import { Request, Response } from "express";
import { container } from "tsyringe";
import GetTicketDashboardService from "../../../services/get-promotion-ticket-dashboard-by-store.service";
import GetGeneralTicketDashboardService from "../../../services/get-general-promotion-ticket-dashboard.service";
import DefaultQueryOptions from "../../../../../shared/infra/orm/dtos/default-query-options.dto";
import GetPromotionTicketDashboardTicketByUserService from "../../../services/get-promotion-ticket-dashboard-by-user.service";

class TicketController {
  public async getDashboardByUser(request: Request<{}, {}, {}, DefaultQueryOptions>, response: Response) {
    const user_id = request.user_id;
    const getDashboardByUserService = container.resolve(GetPromotionTicketDashboardTicketByUserService);
    const dashboardData = await getDashboardByUserService.execute(user_id, request.query);
    return response.status(200).json(dashboardData);
  }

  public async getDashboardByStore(request: Request<{ store_id: string }, {}, {}, DefaultQueryOptions>, response: Response) {
    const store_id = request.params.store_id;
    const getTicketDashboardService = container.resolve(GetTicketDashboardService);
    const dashboardData = await getTicketDashboardService.execute(store_id, request.query);
    return response.status(200).json(dashboardData);
  }

  public async getGeneralDashboard(request: Request<{}, {}, {}, DefaultQueryOptions>, response: Response) {
    const getGeneralTicketDashboardService = container.resolve(GetGeneralTicketDashboardService);
    const dashboardData = await getGeneralTicketDashboardService.execute(request.query);
    return response.status(200).json(dashboardData);
  }
}

export default TicketController;
