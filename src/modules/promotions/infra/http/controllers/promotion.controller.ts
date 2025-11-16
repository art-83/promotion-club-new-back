import PromotionQueryOptionsDTO from "../../../dtos/promotions/promotion-query-options.dto";
import CreatePromotionService from "../../../services/promotions/create-promotion.service";
import DeletePromotionService from "../../../services/promotions/delete-promotion.service";
import ShowPromotionsServices from "../../../services/promotions/show-promotions.service";
import UpdatePromotionService from "../../../services/promotions/update-promotion.service";
import { Request, Response } from "express";
import { container } from "tsyringe";

class PromotionController {
  public async create(request: Request, response: Response) {
    const createPromotionService = container.resolve(CreatePromotionService);
    const createPromotion = await createPromotionService.execute(request.body);
    return response.status(201).json(createPromotion);
  }

  public async show(request: Request<{}, {}, {}, PromotionQueryOptionsDTO>, response: Response) {
    const showPromotionsService = container.resolve(ShowPromotionsServices);
    const showPromotions = await showPromotionsService.execute(request.query);
    return response.status(200).json(showPromotions);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updatePromotionService = container.resolve(UpdatePromotionService);
    const updatePromotion = await updatePromotionService.execute(id, request.body);
    return response.status(200).json(updatePromotion);
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deletePromotionService = container.resolve(DeletePromotionService);
    await deletePromotionService.execute(id);
    return response.status(204).send();
  }
}

export default PromotionController;
