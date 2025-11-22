import { Request, Response } from "express";
import { container } from "tsyringe";
import GetTicketDashboardService from "../../../services/get-ticket-dashboard.service";

class TicketController {
  public async getDashboard(request: Request, response: Response) {
    const store_id = String(request.params.store_id);
    const getTicketDashboardService = container.resolve(GetTicketDashboardService);
    const dashboardData = await getTicketDashboardService.execute(store_id);
    return response.status(200).json(dashboardData);
  }
}

export default TicketController;
