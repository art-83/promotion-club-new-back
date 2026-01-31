import { inject, injectable } from "tsyringe";
import Invoice from "../infra/orm/entities/invoice.entity";
import InvoiceQueryOptionsDTO from "../dtos/invoices/invoice-query-options.dto";
import InvoiceRepositoryProvider from "../infra/orm/repositories/providers/invoice-repository.provider";

@injectable()
class ShowInvoicesServices {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: InvoiceRepositoryProvider
  ) {}

  public async execute(options: Partial<InvoiceQueryOptionsDTO>): Promise<Invoice[]> {
    return await this.invoiceRepository.find(options);
  }
}

export default ShowInvoicesServices;
