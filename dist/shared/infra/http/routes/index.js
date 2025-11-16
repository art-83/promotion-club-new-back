"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("../../../../modules/users/infra/http/routers/user.routes"));
const store_routes_1 = __importDefault(require("../../../../modules/stores/infra/http/routers/store.routes"));
const product_routes_1 = __importDefault(require("../../../../modules/promotions/infra/http/routers/product.routes"));
const promotion_routes_1 = __importDefault(require("../../../../modules/promotions/infra/http/routers/promotion.routes"));
const image_routes_1 = __importDefault(require("../../../../modules/images/infra/http/routers/image.routes"));
const qr_code_routes_1 = __importDefault(require("../../../../modules/qr-code/infra/http/routers/qr-code.routes"));
const auth_routes_1 = __importDefault(require("../../../../modules/users/infra/http/routers/auth.routes"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const routes = (0, express_1.Router)();
routes.use("/auth", auth_routes_1.default);
routes.use(auth_middleware_1.default);
routes.use("/users", user_routes_1.default);
routes.use("/stores", store_routes_1.default);
routes.use("/products", product_routes_1.default);
routes.use("/promotions", promotion_routes_1.default);
routes.use("/images", image_routes_1.default);
routes.use("/qr-codes", qr_code_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map