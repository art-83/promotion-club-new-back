import { inject, injectable } from "tsyringe";
import Invoice from "../infra/orm/entities/invoice.entity";
import InvoiceQueryOptionsDTO from "../dtos/invoices/invoice-query-options.dto";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";

@injectable()
class ShowInvoicesServices {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>
  ) {}

  public async execute(options: Partial<InvoiceQueryOptionsDTO>): Promise<Invoice[]> {
    return await this.invoiceRepository.find(options);
  }
}

export default ShowInvoicesServices;
