import "reflect-metadata";

import { container } from "tsyringe";
import RepositoryProvider from "../infra/orm/repositories/providers/repository.provider";
import User from "../../modules/users/infra/orm/entities/user.entity";
import UserRepository from "../../modules/users/infra/orm/repositories/implementations/user-repository.implemetation";
import HashProvider from "../infra/hash/infra/providers/hash.provider";
import Hash from "../infra/hash/infra/implementations/hash.implementation";
import JwtProvider from "../infra/jwt/infra/provider/jwt.provider";
import Jwt from "../infra/jwt/infra/implementation/jwt.implementation";

import UserPermissions from "../../modules/users/infra/orm/entities/user-permissions.entity";
import UserPermissionsRepository from "../../modules/users/infra/orm/repositories/implementations/user-permissions-repository.implementation";
import Store from "../../modules/stores/infra/orm/entities/store.entity";
import StoreRepository from "../../modules/stores/infra/orm/repositories/implementations/store-repository.implementation";
import Product from "../../modules/promotions/infra/orm/entities/product.entity";
import ProductRepository from "../../modules/promotions/infra/orm/repositories/implementations/product-repository.implementation";
import Promotion from "../../modules/promotions/infra/orm/entities/promotion.entity";
import PromotionRepository from "../../modules/promotions/infra/orm/repositories/implementations/promotion-repository.implementation";
import ImageRepositoryProvider from "../../modules/images/infra/orm/repositories/provider/image-repository.provider";
import ImageRepository from "../../modules/images/infra/orm/repositories/implementations/image-repository.implementation";

import CacheProvider from "../infra/cache/providers/cache.provider";
import Cache from "../../modules/qr-code/infra/cache/implementation/cache.implementation";

import PromotionTicket from "../../modules/tickets/infra/orm/entities/promotion-ticket.entity";
import PromotionTicketRepository from "../../modules/tickets/infra/orm/repositories/implementations/promotion-ticket-repository.implementation";

container.registerSingleton<RepositoryProvider<User>>("UserRepository", UserRepository);

container.registerSingleton<RepositoryProvider<UserPermissions>>("UserPermissionsRepository", UserPermissionsRepository);

container.registerSingleton<RepositoryProvider<Store>>("StoreRepository", StoreRepository);
container.registerSingleton<RepositoryProvider<Product>>("ProductRepository", ProductRepository);
container.registerSingleton<RepositoryProvider<Promotion>>("PromotionRepository", PromotionRepository);

container.registerSingleton<RepositoryProvider<PromotionTicket>>("PromotionTicketRepository", PromotionTicketRepository);

container.registerSingleton<ImageRepositoryProvider>("ImageRepository", ImageRepository);

container.registerSingleton<HashProvider>("Hash", Hash);

container.registerSingleton<JwtProvider>("Jwt", Jwt);

container.registerSingleton<CacheProvider<any>>("CacheProvider", Cache);
