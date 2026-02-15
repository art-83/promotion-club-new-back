import { Router } from "express";
import userRoutes from "../../../../modules/users/infra/http/routers/user.routes";
import storeRoutes from "../../../../modules/stores/infra/http/routers/store.routes";
import storeCategoryRoutes from "../../../../modules/stores/infra/http/routers/store-category.routes";
import storeStoreCategoryRoutes from "../../../../modules/stores/infra/http/routers/store-store-category.routes";
import storeRatingRoutes from "../../../../modules/stores/infra/http/routers/store-rating.routes";
import storeRatingResponseRoutes from "../../../../modules/stores/infra/http/routers/store-rating-response.routes";
import promotionRoutes from "../../../../modules/promotions/infra/http/routers/promotion.routes";
import imageRoutes from "../../../../modules/images/infra/http/routers/image.routes";
import qrCodeRoutes from "../../../../modules/qr-code/infra/http/routers/qr-code.routes";
import ticketRoutes from "../../../../modules/tickets/infra/http/routers/ticket.routes";
import invoiceRoutes from "../../../../modules/invoices/infra/http/routers/invoice.routes";
import benefitRoutes from "../../../../modules/benefits/infra/http/routers/benefit.routes";
import tagRoutes from "../../../../modules/promotions/infra/http/routers/tag.routes";
import promotionTagRoutes from "../../../../modules/promotions/infra/http/routers/promotion-tag.routes";
import promotionCategoryRoutes from "../../../../modules/promotions/infra/http/routers/promotion-category.routes";
import promotionPromotionCategoryRoutes from "../../../../modules/promotions/infra/http/routers/promotion-promotion-category.routes";
import authRouter from "../../../../modules/users/infra/http/routers/auth.routes";
import authMiddleware from "../middlewares/auth.middleware";
import telemetryMiddleware from "../middlewares/telemetry.middleware";

const routes = Router();

routes.use("/health", (req, res) => {
  return res.status(200).json({ message: "Hello, World! v1.0.4" });
});
routes.use("/auth", authRouter);

routes.use(authMiddleware);
//routes.use(telemetryMiddleware);

routes.use("/users", userRoutes);
routes.use("/stores", storeRoutes);
routes.use("/store-categories", storeCategoryRoutes);
routes.use("/store-store-categories", storeStoreCategoryRoutes);
routes.use("/store-ratings", storeRatingRoutes);
routes.use("/store-rating-responses", storeRatingResponseRoutes);
routes.use("/promotions", promotionRoutes);
routes.use("/images", imageRoutes);
routes.use("/qr-codes", qrCodeRoutes);
routes.use("/tickets", ticketRoutes);
routes.use("/invoices", invoiceRoutes);
routes.use("/benefits", benefitRoutes);
routes.use("/tags", tagRoutes);
routes.use("/promotion-tags", promotionTagRoutes);
routes.use("/promotion-categories", promotionCategoryRoutes);
routes.use("/promotion-promotion-categories", promotionPromotionCategoryRoutes);

export default routes;
