import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Invoice from "../../infra/orm/entities/invoice.entity";

interface InvoiceQueryOptionsDTO extends Invoice, DefaultQueryOptions {
  store_id: string;
  join_store: boolean;
}

export default InvoiceQueryOptionsDTO;
