import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import InvoiceController from "../controllers/invoice.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const invoiceRoutes = Router();
const invoiceController = new InvoiceController();

invoiceRoutes.post(
  "/pay",
  permissionMiddleware(Permissions.PAY_INVOICE),
  invoiceController.pay
);

invoiceRoutes.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      was_paid: Joi.boolean().required(),
    },
  }),
  invoiceController.update
);

invoiceRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_INVOICES),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      store_id: Joi.string().uuid().optional(),
      was_paid: Joi.boolean().optional(),
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
    },
  }),
  invoiceController.show
);

invoiceRoutes.delete(
  "/:id",
  permissionMiddleware(Permissions.SHOW_INVOICES),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  invoiceController.delete
);

export default invoiceRoutes;
