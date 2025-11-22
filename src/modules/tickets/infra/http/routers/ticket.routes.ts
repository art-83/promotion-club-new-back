import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import TicketController from "../controllers/ticket.controller";
import AuthMiddleware from "../../../../../shared/infra/http/middlewares/auth.middleware";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.use(AuthMiddleware);

ticketRoutes.get(
  "/dashboard/:store_id",
  celebrate({
    [Segments.PARAMS]: {
      store_id: Joi.string().uuid().required(),
    },
  }),
  ticketController.getDashboard
);

export default ticketRoutes;
