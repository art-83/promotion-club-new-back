import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import TicketController from "../controllers/ticket.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_USER_PROMOTION_TICKETS),
  celebrate({
    [Segments.QUERY]: {
      product_name: Joi.string().optional(),
      store_id: Joi.string().uuid().optional(),
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
      limit: Joi.number().integer().optional(),
      offset: Joi.number().integer().optional(),
    },
  }),
  ticketController.showByUser
);

ticketRoutes.get(
  "/dashboard",
  permissionMiddleware(Permissions.GET_DASHBOARD_BY_USER),
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
    },
  }),
  ticketController.getDashboardByUser
);

ticketRoutes.get(
  "/dashboard/general",
  permissionMiddleware(Permissions.GET_GENERAL_DASHBOARD),
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
    },
  }),
  ticketController.getGeneralDashboard
);

ticketRoutes.get(
  "/dashboard/store/:store_id",
  permissionMiddleware(Permissions.GET_DASHBOARD_BY_STORE),
  celebrate({
    [Segments.PARAMS]: {
      store_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
    },
  }),
  ticketController.getDashboardByStore
);

export default ticketRoutes;
