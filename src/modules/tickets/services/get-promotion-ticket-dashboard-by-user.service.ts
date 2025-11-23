import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import UserPermissions from "../../users/infra/orm/entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../users/dtos/users-permissions/user-permissions-query-options.dto";
import AppError from "../../../shared/infra/http/errors/app-error";
import PromotionTickerDashboardDTO from "../dtos/dashboards/promotion-ticket-dashboard.dto";
import PromotionTicketRepositoryProvider from "../infra/orm/repositories/providers/promotion-ticket-repository.provider";
import DefaultQueryOptions from "../../../shared/infra/orm/dtos/default-query-options.dto";

@injectable()
class GetPromotionTicketDashboardTicketByUserService {
  constructor(
    @inject("UserPermissionsRepository")
    private userPermissionsRepository: RepositoryProvider<UserPermissions>,
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: PromotionTicketRepositoryProvider
  ) {}

  public async execute(user_id: string, options: Partial<DefaultQueryOptions>): Promise<PromotionTickerDashboardDTO> {
    const userPermissionsQueryOptions = {
      user_id: user_id,
      join_store: true,
    } as UserPermissionsQueryOptionsDTO;

    const userPermissions = (await this.userPermissionsRepository.find(userPermissionsQueryOptions)).at(0);

    if (!userPermissions || !userPermissions.store) throw new AppError(404, "User permissions not found or store not vinculated.");

    const promotionTicketCountDashboard = await this.promotionTicketRepository.getCountDashboardByStore(userPermissions.store.id, options);

    return promotionTicketCountDashboard;
  }
}

export default GetPromotionTicketDashboardTicketByUserService;
