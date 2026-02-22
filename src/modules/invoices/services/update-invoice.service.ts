import { inject, injectable } from "tsyringe";
import Invoice from "../infra/orm/entities/invoice.entity";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";

@injectable()
class UpdateInvoiceService {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>
  ) {}

  public async execute(id: string, data: Partial<Invoice>): Promise<void> {
    await this.invoiceRepository.update(id, data);
  }
}

export default UpdateInvoiceService;