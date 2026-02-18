import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Invoice from "../infra/orm/entities/invoice.entity";
import CreateInvoiceDTO from "../dtos/invoices/create-or-update-invoice.dto";
import AppError from "../../../shared/infra/http/errors/app-error";
import UserPermissions from "../../users/infra/orm/entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../users/dtos/users-permissions/user-permissions-query-options.dto";
import File from "../../files/infra/orm/entities/file.entity";
@injectable()
class RequestInvoicePaymentService {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>,
    @inject("UserPermissionsRepository")
    private userPermissionsRepository: RepositoryProvider<UserPermissions>,
    @inject("FileRepository")
    private fileRepository: RepositoryProvider<File>
  ) {}

  public async execute(user_id: string, data: Partial<CreateInvoiceDTO>) {
    const userPermissionsQueryOptions = {
      user_id: user_id,
      join_store: true,
    } as UserPermissionsQueryOptionsDTO;

    const fileQueryOptions = {
      id: data.file_id,
    } as Partial<File>;

    const [userPermissions, file] = await Promise.all([
      (await this.userPermissionsRepository.find(userPermissionsQueryOptions)).at(0),
      (await this.fileRepository.find(fileQueryOptions)).at(0)
    ]);

    if (!userPermissions || !userPermissions.store) throw new AppError(404, "User permissions not found or user not associated to any store.", "Permissões do usuário não encontradas ou usuário não associado a nenhuma loja.");
    if (!file) throw new AppError(404, "File not found.", "Arquivo não encontrado.");

    data.store = userPermissions.store;
    data.file = file;

    await this.invoiceRepository.create(data);

    return { message: "Invoice created successfully." };
  }
}

export default RequestInvoicePaymentService;