import Invoice from "../../infra/orm/entities/invoice.entity";

interface CreateInvoiceDTO extends Invoice {
  store_id: string;
}

export default CreateInvoiceDTO;
