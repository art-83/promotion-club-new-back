"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const user_repository_implemetation_1 = __importDefault(require("../../modules/users/infra/orm/repositories/implementations/user-repository.implemetation"));
const hash_implementation_1 = __importDefault(require("../infra/hash/infra/implementations/hash.implementation"));
const jwt_implementation_1 = __importDefault(require("../infra/jwt/infra/implementation/jwt.implementation"));
const user_permissions_repository_implementation_1 = __importDefault(require("../../modules/users/infra/orm/repositories/implementations/user-permissions-repository.implementation"));
const store_repository_implementation_1 = __importDefault(require("../../modules/stores/infra/orm/repositories/implementations/store-repository.implementation"));
const product_repository_implementation_1 = __importDefault(require("../../modules/promotions/infra/orm/repositories/implementations/product-repository.implementation"));
const promotion_repository_implementation_1 = __importDefault(require("../../modules/promotions/infra/orm/repositories/implementations/promotion-repository.implementation"));
const image_repository_implementation_1 = __importDefault(require("../../modules/images/infra/orm/repositories/implementations/image-repository.implementation"));
const cache_implementation_1 = __importDefault(require("../../modules/qr-code/infra/cache/implementation/cache.implementation"));
const promotion_ticket_repository_implementation_1 = __importDefault(require("../../modules/tickets/infra/orm/repositories/implementations/promotion-ticket-repository.implementation"));
tsyringe_1.container.registerSingleton("UserRepository", user_repository_implemetation_1.default);
tsyringe_1.container.registerSingleton("UserPermissionsRepository", user_permissions_repository_implementation_1.default);
tsyringe_1.container.registerSingleton("StoreRepository", store_repository_implementation_1.default);
tsyringe_1.container.registerSingleton("ProductRepository", product_repository_implementation_1.default);
tsyringe_1.container.registerSingleton("PromotionRepository", promotion_repository_implementation_1.default);
tsyringe_1.container.registerSingleton("PromotionTicketRepository", promotion_ticket_repository_implementation_1.default);
tsyringe_1.container.registerSingleton("ImageRepository", image_repository_implementation_1.default);
tsyringe_1.container.registerSingleton("Hash", hash_implementation_1.default);
tsyringe_1.container.registerSingleton("Jwt", jwt_implementation_1.default);
tsyringe_1.container.registerSingleton("CacheProvider", cache_implementation_1.default);
//# sourceMappingURL=index.js.map