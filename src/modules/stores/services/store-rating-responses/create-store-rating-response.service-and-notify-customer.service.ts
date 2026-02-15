import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRatingResponse from "../../infra/orm/entities/store-rating-response.entity";
import StoreRating from "../../infra/orm/entities/store-rating.entity";
import User from "../../../users/infra/orm/entities/user.entity";
import CreateOrUpdateStoreRatingResponseDto from "../../dtos/store-rating-responses/create-or-update-store-rating-response.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";
import NotificationPusherProvider from "../../../../shared/infra/push/infra/providers/notification-pusher.provider";
import UserPushToken from "../../../users/infra/orm/entities/user-push-token.entity";
import NotificationPushMessageDTO from "../../../../shared/infra/push/dtos/notification-push-message.dto";

@injectable()
class CreateStoreRatingAndNotifyCustomerService {
  constructor(
    @inject("StoreRatingResponseRepository")
    private storeRatingResponseRepository: RepositoryProvider<StoreRatingResponse>,
    @inject("StoreRatingRepository")
    private storeRatingRepository: RepositoryProvider<StoreRating>,
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("UserPushTokenRepository")
    private userPushTokenRepository: RepositoryProvider<UserPushToken>,
    @inject("NotificationPusher")
    private notificationPusher: NotificationPusherProvider
  ) {}

  public async execute(data: Partial<CreateOrUpdateStoreRatingResponseDto>): Promise<StoreRatingResponse> {
    const [storeRating, user] = await Promise.all([
      (await this.storeRatingRepository.find({ id: data.store_rating_id })).at(0),
      (await this.userRepository.find({ id: data.user_id })).at(0),
    ]);
    if (!storeRating) throw new AppError(404, "Store rating not found.");
    if (!user) throw new AppError(404, "User not found.");

    const tokens = (await this.userPushTokenRepository.find({user_id: storeRating.user.id})).map((token) => token.token);

    if (tokens.length) {
      const title = `Nova resposta de avaliação para o estabelecimento ${storeRating.store.name}!`;
      const description = data.description;
      const notificationPushMessage = {
        title,
        description,
      } as NotificationPushMessageDTO;
      await this.notificationPusher.push(tokens, notificationPushMessage);
    }

    data.store_rating = storeRating;
    data.user = user;

    return await this.storeRatingResponseRepository.create(data);
  }
}

export default CreateStoreRatingAndNotifyCustomerService;
