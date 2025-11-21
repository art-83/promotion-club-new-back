import { Request, Response } from "express";
import { container } from "tsyringe";
import GenerateQrCodeService from "../../../services/generate-qr-code.service";
import ValidateQrCodeAndCreatePromotionTicketAndUpdateUserScoreService from "../../../services/validate-qr-code-and-create-promotion-ticket-and-update-user-score";

class QrCodeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const generateQrCodeService = container.resolve(GenerateQrCodeService);
    const promotion_id = request.body.promotion_id;
    const user_id = request.user_id;
    const qrCode = await generateQrCodeService.execute({
      user_id,
      promotion_id,
    });
    return response.status(201).json(qrCode);
  }

  public async validate(request: Request, response: Response): Promise<Response> {
    const user_id = String(request.params.user_id);
    const validateQrCodeAndCreatePromotionTicketAndUpdateUserScoreService = container.resolve(
      ValidateQrCodeAndCreatePromotionTicketAndUpdateUserScoreService
    );
    const qrCode = await validateQrCodeAndCreatePromotionTicketAndUpdateUserScoreService.execute(user_id);
    return response.status(200).json(qrCode);
  }
}

export default QrCodeController;
