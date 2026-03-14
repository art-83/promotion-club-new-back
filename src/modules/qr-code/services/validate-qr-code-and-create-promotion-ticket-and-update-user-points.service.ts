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
import UserPermissionsQueryOptionsDTO from "../../users/dtos/users-permissions/user-permissions-query-options.dto";
import UserPermissions from "../../users/infra/orm/entities/user-permissions.entity";
import BenefitTier from "../../benefits/infra/orm/entities/benefit-tier.entity";

@injectable()
class ValidateQrCodeAndCreatePromotionTicketAndUpdateUserPointsService {
  constructor(
    @inject("CacheProvider")
    private cache: CacheProvider<QrCodePayloadDto>,
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: RepositoryProvider<PromotionTicket>,
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>,
    @inject("UserPermissionsRepository")
    private userPermissionsRepository: RepositoryProvider<UserPermissions>,
    @inject("BenefitTierRepository")
    private benefitTierRepository: RepositoryProvider<BenefitTier>,
  ) {}

  public async execute(user_id: string): Promise<{ message: string; createPromotionTicket: Partial<PromotionTicket> }> {
    const qrCode = await this.cache.find(user_id);

    if (!qrCode) throw new AppError(404, "QrCode not found.", "QR Code não encontrado.");

    const qrCodeParsed = JSON.parse(qrCode);

    const userQueryOptions = {
      id: user_id,
    } as UserQueryOptionsDTO;

    const promotionsQueryOptions = {
      id: qrCodeParsed.promotion_id,
      join_store: true,
    } as PromotionQueryOptionsDTO;

    const userPermissionsQueryOptions = {
      user_id,
      join_store: true,
    } as UserPermissionsQueryOptionsDTO;

    const [user, promotion, userPermissions] = await Promise.all([
      (await this.userRepository.find(userQueryOptions)).at(0),
      (await this.promotionRepository.find(promotionsQueryOptions)).at(0),
      (await this.userPermissionsRepository.find(userPermissionsQueryOptions)).at(0),
    ]);

    if (!user) throw new AppError(404, "User not found.", "Usuário não encontrado.");
    if (!promotion) throw new AppError(404, "Promotion not found.", "Promoção não encontrada.");

    if (promotion && promotion.store && userPermissions && userPermissions.store && promotion.store.id !== userPermissions.store.id) {
      throw new AppError(403, "Promotion not available for this store.", "Promoção não disponível para esta loja.");
    }

    const createPromotionTicketData = {
      user,
      promotion,
    } as Partial<PromotionTicket>;

    const createPromotionTicket = await this.promotionTicketRepository.create(createPromotionTicketData);

    const removeQrCode = await this.cache.delete(user_id);
    if (!removeQrCode) throw new AppError(404, "QrCode invalid or expired.", "QR Code inválido ou expirado.");

    const newPoints = await this.calculateUserPoints(user, promotion);

    const firstPromotionTicketIssuedAt = user.first_promotion_ticket_issued_at ? user.first_promotion_ticket_issued_at : new Date();

    await this.userRepository.update(user_id, { points: newPoints, first_promotion_ticket_issued_at: firstPromotionTicketIssuedAt });

    return { message: "QrCode validated successfuly.", createPromotionTicket };
  }

  private async calculateUserPoints(user: User, promotion: Promotion): Promise<number> {
    const userBenefitTier = (await this.benefitTierRepository.find({ minimum_points: user.points, maximum_points: user.points })).at(0);

    if (!userBenefitTier) throw new AppError(404, "Benefit tier not found.", "Nível de benefício não encontrado.");

    const multiplierMap = new Map<string, number>();

    multiplierMap.set("BASIC", 1);
    multiplierMap.set("PREMIUM", 1.5);
    multiplierMap.set("VIP", 2);
    
    const formatedBenefitName = userBenefitTier.name.toUpperCase();

    const multiplier = multiplierMap.get(formatedBenefitName);

    if (!multiplier) throw new AppError(404, "Multiplier not found.", "Multiplicador não encontrado para o nível de benefício.");

    return parseInt(((Number(user.points) + Number(promotion.final_price)) / 10).toString(), 10) * multiplier;
  }
}

export default ValidateQrCodeAndCreatePromotionTicketAndUpdateUserPointsService;
