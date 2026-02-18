import { Request, Response } from "express";
import { container } from "tsyringe";
import RequestInvoicePaymentService from "../../../services/request-invoice-payment.service";
import ShowInvoiceService from "../../../services/show-invoice.service";
import UpdateInvoiceService from "../../../services/update-invoice.service";
import ShowInvoiceByUserService from "../../../services/show-invoice-by-user.service";

class InvoiceController {
  public async pay(request: Request, response: Response) {
    const requestInvoicePaymentService = container.resolve(RequestInvoicePaymentService);
    const invoice = await requestInvoicePaymentService.execute(request.user_id, request.body);
    return response.status(201).json(invoice);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updateInvoiceService = container.resolve(UpdateInvoiceService);
    await updateInvoiceService.execute(id, request.body);
    return response.status(204).send();
  }

  public async show(request: Request, response: Response) {
    const showInvoiceService = container.resolve(ShowInvoiceService);
    const invoices = await showInvoiceService.execute(request.query);
    return response.status(200).json(invoices);
  }
}

export default InvoiceController;
