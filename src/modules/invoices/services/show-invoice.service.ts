import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Invoice from "../infra/orm/entities/invoice.entity";
import InvoiceQueryOptionsDTO from "../dtos/invoices/invoice-query-options.dto";

@injectable()
class ShowInvoiceService {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>
  ) {}

  public async execute(options: Partial<InvoiceQueryOptionsDTO>): Promise<Invoice[]> {
    const invoices = await this.invoiceRepository.find(options);
    return invoices;
  }
}

export default ShowInvoiceService;