import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateInvoiceService from "../../../services/create-invoice.service";
import ShowInvoicesServices from "../../../services/show-invoices.service";
import DeleteInvoiceService from "../../../services/delete-invoice.service";

class InvoiceController {
  public async create(request: Request, response: Response) {
    const createInvoiceService = container.resolve(CreateInvoiceService);
    const invoice = await createInvoiceService.execute(request.body);
    return response.status(201).json(invoice);
  }

  public async show(request: Request, response: Response) {
    const showInvoicesService = container.resolve(ShowInvoicesServices);
    const invoices = await showInvoicesService.execute(request.query);
    return response.status(200).json(invoices);
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteInvoiceService = container.resolve(DeleteInvoiceService);
    await deleteInvoiceService.execute(id);
    return response.status(204).send();
  }
}

export default InvoiceController;
