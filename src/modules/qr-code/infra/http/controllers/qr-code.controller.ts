import { Request, Response } from "express";
import { container } from "tsyringe";
import GenerateQrCodeService from "../../../services/generate-qr-code.service";
import ValidateQrCodeService from "../../../services/validate-qr-code-and-create-promotion-ticket.service";

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
    const validateQrCodeService = container.resolve(ValidateQrCodeService);
    const qrCode = await validateQrCodeService.execute(request.user_id);
    return response.status(200).json(qrCode);
  }
}

export default QrCodeController;
