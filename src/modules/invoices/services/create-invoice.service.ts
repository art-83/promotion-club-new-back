import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Invoice from "../infra/orm/entities/invoice.entity";
import CreateInvoiceDTO from "../dtos/invoices/create-invoice.dto";
import AppError from "../../../shared/infra/http/errors/app-error";
import Store from "../../stores/infra/orm/entities/store.entity";

@injectable()
class CreateInvoiceService {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: RepositoryProvider<Invoice>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(data: Partial<CreateInvoiceDTO>): Promise<Invoice> {
    const store = (await this.storeRepository.find({ id: data.store_id })).at(0);
    if (!store) throw new AppError(404, "Store not found.");
    data.store = store;
    return await this.invoiceRepository.create(data);
  }
}

export default CreateInvoiceService;
