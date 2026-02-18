import { Repository } from "typeorm";
import dataSource from "../../../../../../shared/infra/orm/database";
import InvoiceQueryOptionsDTO from "../../../../dtos/invoices/invoice-query-options.dto";
import Invoice from "../../entities/invoice.entity";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import CreateOrUpdateInvoiceDTO from "../../../../dtos/invoices/create-or-update-invoice.dto";

class InvoiceRepository implements RepositoryProvider<Invoice> {
  private repository: Repository<Invoice>;

  constructor() {
    this.repository = dataSource.getRepository(Invoice);
  }

  public async find(options: Partial<InvoiceQueryOptionsDTO>): Promise<Invoice[]> {
    const query = this.repository.createQueryBuilder("invoices");

    query.leftJoinAndSelect("invoices.file", "file");
    
    if (options.id) query.andWhere("invoices.id = :id", { id: options.id });
    if (options.store_id) query.andWhere("invoices.store_id = :store_id", { store_id: options.store_id });
    if (options.created_at) query.andWhere("invoices.created_at = :created_at", { created_at: options.created_at });
    if (options.updated_at) query.andWhere("invoices.updated_at = :updated_at", { updated_at: options.updated_at });
    if (options.status) query.andWhere("invoices.status ILIKE :status", { status: `%${options.status}%` });

    if (options.join_store) {
      query.leftJoinAndSelect("invoices.store", "store");
    }

    if (options.start_date) query.andWhere("invoices.created_at >= :start_date", { start_date: options.start_date });
    if (options.end_date) query.andWhere("invoices.created_at <= :end_date", { end_date: options.end_date });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.andWhere("invoices.deleted_at IS NULL");

    return await query.getMany();
  }

  public async create(data: Partial<CreateOrUpdateInvoiceDTO>): Promise<Invoice> {
    const createInvoice = this.repository.create(data);
    const saveInvoice = await this.repository.save(createInvoice);
    return saveInvoice;
  }

  public async update(id: string, data: Partial<Invoice>): Promise<void> {
    const updateInvoice = this.repository.create(data);
    await this.repository.update(id, updateInvoice);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

export default InvoiceRepository;
