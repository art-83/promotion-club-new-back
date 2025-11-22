import { Request, Response } from "express";
import { container } from "tsyringe";
import GetTicketDashboardService from "../../../services/get-ticket-dashboard.service";
import GetGeneralTicketDashboardService from "../../../services/get-general-ticket-dashboard.service";
import DefaultQueryOptions from "../../../../../shared/infra/orm/dtos/default-query-options.dto";

class TicketController {
  public async getDashboard(request: Request, response: Response) {
    const store_id = String(request.params.store_id);
    const getTicketDashboardService = container.resolve(GetTicketDashboardService);
    const dashboardData = await getTicketDashboardService.execute(store_id);
    return response.status(200).json(dashboardData);
  }

  public async getGeneralDashboard(request: Request<{}, {}, {}, DefaultQueryOptions>, response: Response) {
    const getGeneralTicketDashboardService = container.resolve(GetGeneralTicketDashboardService);
    const dashboardData = await getGeneralTicketDashboardService.execute(request.query);
    return response.status(200).json(dashboardData);
  }
}

export default TicketController;
