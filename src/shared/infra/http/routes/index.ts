import { Router } from "express";
import userRoutes from "../../../../modules/users/infra/http/routers/user.routes";
import storeRoutes from "../../../../modules/stores/infra/http/routers/store.routes";
import productRoutes from "../../../../modules/promotions/infra/http/routers/product.routes";
import promotionRoutes from "../../../../modules/promotions/infra/http/routers/promotion.routes";
import imageRoutes from "../../../../modules/images/infra/http/routers/image.routes";
import qrCodeRoutes from "../../../../modules/qr-code/infra/http/routers/qr-code.routes";
import ticketRoutes from "../../../../modules/tickets/infra/http/routers/ticket.routes";
import authRouter from "../../../../modules/users/infra/http/routers/auth.routes";
import authMiddleware from "../middlewares/auth.middleware";
import telemetryMiddleware from "../middlewares/telemetry.middleware";

const routes = Router();

routes.use("/health", (req, res) => {
  return res.status(200).json({ message: "Hello, World! v1.0.2" });
});
routes.use("/auth", authRouter);

routes.use(authMiddleware);
//routes.use(telemetryMiddleware);

routes.use("/users", userRoutes);
routes.use("/stores", storeRoutes);
routes.use("/products", productRoutes);
routes.use("/promotions", promotionRoutes);
routes.use("/images", imageRoutes);
routes.use("/qr-codes", qrCodeRoutes);
routes.use("/tickets", ticketRoutes);

export default routes;
