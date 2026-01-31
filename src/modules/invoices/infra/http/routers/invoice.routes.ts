import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import InvoiceController from "../controllers/invoice.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const invoiceRoutes = Router();
const invoiceController = new InvoiceController();

invoiceRoutes.post(
  "/",
  permissionMiddleware(Permissions.CREATE_INVOICE),
  celebrate({
    [Segments.BODY]: {
      store_id: Joi.string().uuid().required(),
    },
  }),
  invoiceController.create
);

invoiceRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_INVOICES),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      store_id: Joi.string().uuid(),
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
      offset: Joi.number().integer(),
      limit: Joi.number().integer(),
      join_store: Joi.boolean(),
    },
  }),
  invoiceController.show
);

invoiceRoutes.delete(
  "/:id",
  permissionMiddleware(Permissions.DELETE_INVOICE),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  invoiceController.delete
);

export default invoiceRoutes;
