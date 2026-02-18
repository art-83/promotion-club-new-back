import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
import CreateOrUpdatePromotionDTO from "../../dtos/promotions/create-or-update-promotion.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";
import Store from "../../../stores/infra/orm/entities/store.entity";
import File from "../../../files/infra/orm/entities/file.entity";
import NotificationPusherProvider from "../../../../shared/infra/push/infra/providers/notification-pusher.provider";
import PromotionQueryOptionsDTO from "../../dtos/promotions/promotion-query-options.dto";
import NotificationPushMessageDTO from "../../../../shared/infra/push/dtos/notification-push-message.dto";
import UserPushToken from "../../../users/infra/orm/entities/user-push-token.entity";
import UserStoreOptions from "../../../users/infra/orm/entities/user-store-options.entity";
import UserStoreOptionsQueryOptionsDTO from "../../../users/dtos/user-store-options/user-store-options-query-options.dto";

@injectable()
class UpdatePromotionService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("FileRepository")
    private fileRepository: RepositoryProvider<File>,
    @inject("UserPushTokenRepository")
    private userPushTokenRepository: RepositoryProvider<UserPushToken>,
    @inject("NotificationPusher")
    private notificationPusher: NotificationPusherProvider,
    @inject("UserStoreOptionsRepository")
    private userStoreOptionsRepository: RepositoryProvider<UserStoreOptions>
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdatePromotionDTO>): Promise<void> {
    const options = {
      id,
      join_store: true,
    } as PromotionQueryOptionsDTO;

    const promotion = (await this.promotionRepository.find(options)).at(0);
    if (!promotion) throw new AppError(404, "Promotion not found.");

    if (data.store_id) {
      const store = (await this.storeRepository.find({ id: data.store_id })).at(0);
      if (!store) throw new AppError(404, "Store not found.");
      data.store = store;
    }

    if (data.file_id) {
      const file = (await this.fileRepository.find({ id: data.file_id })).at(0);
      if (!file) throw new AppError(404, "File not found.");
      data.file = file;
    }

    if (data.price || data.discount_percentage) {
      const price = data.price ?? promotion.price;
      const discount_percentage = data.discount_percentage ?? promotion.discount_percentage;
      data.final_price = Number(price) - Number(price) * (Number(discount_percentage) / 100);
    }

    if (data.is_approved) {
      const userStoreOptionsQueryOptions = {
        store_id: promotion.store.id,
      } as UserStoreOptionsQueryOptionsDTO;
      const userStoreOptions = await this.userStoreOptionsRepository.find(userStoreOptionsQueryOptions);
      const tokens = (await this.userPushTokenRepository.find({})).filter((token) =>
        userStoreOptions.some((userStoreOption) => userStoreOption.user.id === token.user_id)
      );
      if (tokens.length) {
        const title = `Promoção quente na loja ${promotion.store.name}!`;
        const description = `Confira a promoção do item ${promotion.name}! Apenas R$ ${promotion.final_price}`;
        const notificationPushMessage = {
          title,
          description,
          data: {
            promotion_id: promotion.id,
            store_id: promotion.store.id,
          },
        } as NotificationPushMessageDTO;
        const tokenStringList = tokens.map((token) => token.token);
        const sendNotification = await this.notificationPusher.push(tokenStringList, notificationPushMessage);
      }
    }
    await this.promotionRepository.update(id, data);
  }
}

export default UpdatePromotionService;
