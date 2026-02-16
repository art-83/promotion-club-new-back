import Invoice from "../../infra/orm/entities/invoice.entity";

interface CreateOrUpdateInvoiceDTO extends Invoice {
  store_id: string;
}

export default CreateOrUpdateInvoiceDTO;
