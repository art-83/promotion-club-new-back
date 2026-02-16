import { inject } from "tsyringe";
import Invoice from "../infra/orm/entities/invoice.entity";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
class ConfirmInvoiceService {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.invoiceRepository.update(id, { status: "PAID" });
  }
}

export default ConfirmInvoiceService;