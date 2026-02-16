import { inject } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Invoice from "../infra/orm/entities/invoice.entity";
import CreateInvoiceDTO from "../dtos/invoices/create-or-update-invoice.dto";
import AppError from "../../../shared/infra/http/errors/app-error";
import UserPermissions from "../../users/infra/orm/entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../users/dtos/users-permissions/user-permissions-query-options.dto";

class RequestInvoicePaymentService {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>,
    @inject("UserPermissionsRepository")
    private userPermissionsRepository: RepositoryProvider<UserPermissions>
  ) {}

  public async execute(user_id: string, data: Partial<CreateInvoiceDTO>): Promise<Invoice> {
    const userPermissionsQueryOptions = {
      user_id: user_id,
      join_store: true,
    } as UserPermissionsQueryOptionsDTO;

    const userPermissions = (await this.userPermissionsRepository.find(userPermissionsQueryOptions)).at(0);
    if (!userPermissions || !userPermissions.store) throw new AppError(404, "User permissions not found or user not associated to any store.");

    data.status = "PENDING";
    data.store = userPermissions.store;

    return await this.invoiceRepository.create(data);
  }
}

export default RequestInvoicePaymentService;