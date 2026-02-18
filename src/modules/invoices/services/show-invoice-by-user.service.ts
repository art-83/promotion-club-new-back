import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Invoice from "../infra/orm/entities/invoice.entity";
import UserPermissions from "../../users/infra/orm/entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../users/dtos/users-permissions/user-permissions-query-options.dto";
import AppError from "../../../shared/infra/http/errors/app-error";
import InvoiceQueryOptionsDTO from "../dtos/invoices/invoice-query-options.dto";

@injectable()
class ShowInvoiceByUserService {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>,
    @inject("UserPermissionsRepository")
    private userPermissionsRepository: RepositoryProvider<UserPermissions>
  ) {}

  public async execute(user_id: string) {
    const userPermissionsQueryOptions = {
      user_id: user_id,
      join_store: true,
    } as UserPermissionsQueryOptionsDTO;

    const userPermissions = (await this.userPermissionsRepository.find(userPermissionsQueryOptions)).at(0);

    if (!userPermissions || !userPermissions.store) throw new AppError(404, "User permissions not found or user not associated to any store.");

    const invoiceQueryOptions = {
      store_id: userPermissions.store.id,
    } as InvoiceQueryOptionsDTO;

    return await this.invoiceRepository.find(invoiceQueryOptions);
  }
}

export default ShowInvoiceByUserService;