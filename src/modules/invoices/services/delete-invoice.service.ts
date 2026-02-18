import { inject, injectable } from "tsyringe";
import Invoice from "../infra/orm/entities/invoice.entity";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";

@injectable()
class DeleteInvoiceService {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.invoiceRepository.delete(id);
  }
}

export default DeleteInvoiceService;
