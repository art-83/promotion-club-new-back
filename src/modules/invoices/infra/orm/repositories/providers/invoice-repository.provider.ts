import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import InvoiceQueryOptionsDTO from "../../../../dtos/invoices/invoice-query-options.dto";
import Invoice from "../../entities/invoice.entity";

interface InvoiceRepositoryProvider extends RepositoryProvider<Invoice> {
  find(options: Partial<InvoiceQueryOptionsDTO>): Promise<Invoice[]>;
}

export default InvoiceRepositoryProvider;
