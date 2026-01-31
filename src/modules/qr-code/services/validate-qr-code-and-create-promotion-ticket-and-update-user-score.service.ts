import { inject, injectable } from "tsyringe";
import CacheProvider from "../../../shared/infra/cache/infra/providers/cache.provider";
import AppError from "../../../shared/infra/http/errors/app-error";
import QrCodePayloadDto from "../dtos/qr-code-payload.dto";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionTicket from "../../tickets/infra/orm/entities/promotion-ticket.entity";
import User from "../../users/infra/orm/entities/user.entity";
import Promotion from "../../promotions/infra/orm/entities/promotion.entity";
import PromotionQueryOptionsDTO from "../../promotions/dtos/promotions/promotion-query-options.dto";
import UserQueryOptionsDTO from "../../users/dtos/users/user-query-options.dto";

@injectable()
class ValidateQrCodeAndCreatePromotionTicketAndUpdateUserScoreService {
  constructor(
    @inject("CacheProvider")
    private cache: CacheProvider<QrCodePayloadDto>,
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: RepositoryProvider<PromotionTicket>,
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>
  ) {}

  public async execute(user_id: string): Promise<{ message: string; createPromotionTicket: Partial<PromotionTicket> }> {
    const qrCode = await this.cache.find(user_id);

    if (!qrCode) throw new AppError(404, "QrCode not found.");

    const qrCodeParsed = JSON.parse(qrCode);

    const userQueryOptions = {
      id: user_id,
    } as UserQueryOptionsDTO;

    const promotionsQueryOptions = {
      id: qrCodeParsed.promotion_id,
      join_store: true,
    } as PromotionQueryOptionsDTO;

    const [user, promotion] = await Promise.all([
      (await this.userRepository.find(userQueryOptions)).at(0),
      (await this.promotionRepository.find(promotionsQueryOptions)).at(0),
    ]);

    if (!user) throw new AppError(404, "User not found.");
    if (!promotion) throw new AppError(404, "Promotion not found.");

    const createPromotionTicketData = {
      product_name: promotion.name,
      product_price: promotion.price,
      promotion_discount_percentage: promotion.discount_percentage,
      promotion_final_price: promotion.final_price,
      saved_money: Number(promotion.price) - Number(promotion.final_price),
      store: promotion.store,
      user: user,
    } as Partial<PromotionTicket>;

    const createPromotionTicket = await this.promotionTicketRepository.create(createPromotionTicketData);

    const removeQrCode = await this.cache.delete(user_id);
    if (!removeQrCode) throw new AppError(404, "QrCode invalid or expired.");

    const newScore = Number(Number(user.score) + Number(promotion.final_price));
    await this.userRepository.update(user_id, { score: newScore });

    return { message: "QrCode validated successfuly.", createPromotionTicket };
  }
}

export default ValidateQrCodeAndCreatePromotionTicketAndUpdateUserScoreService;
