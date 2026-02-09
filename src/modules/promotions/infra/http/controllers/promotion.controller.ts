import CreatePromotionService from "../../../services/promotions/create-promotion.service";
import DeleteExpiredPromotionsService from "../../../services/promotions/delete-expired-promotions.service";
import DeletePromotionService from "../../../services/promotions/delete-promotion.service";
import ShowListOfRecommendedPromotionsByPromotionTicketService from "../../../services/promotions/show-list-of-recommended-promotions-by-promotion-ticket.service";
import ShowPromotionsServices from "../../../services/promotions/show-promotions.service";
import UpdatePromotionService from "../../../services/promotions/update-promotion-and-maybe-send-notifications.service";
import { Request, Response } from "express";
import { container } from "tsyringe";

class PromotionController {
  public async create(request: Request, response: Response) {
    const createPromotionService = container.resolve(CreatePromotionService);
    const createPromotion = await createPromotionService.execute(request.body);
    return response.status(201).json(createPromotion);
  }

  public async show(request: Request, response: Response) {
    const showPromotionsService = container.resolve(ShowPromotionsServices);
    const showPromotions = await showPromotionsService.execute(request.query);
    return response.status(200).json(showPromotions);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updatePromotionService = container.resolve(UpdatePromotionService);
    await updatePromotionService.execute(id, request.body);
    return response.status(204).send();
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deletePromotionService = container.resolve(DeletePromotionService);
    await deletePromotionService.execute(id);
    return response.status(204).send();
  }

  public async deleteExpiredPromotions(request: Request, response: Response) {
    const deletePromotionService = container.resolve(DeleteExpiredPromotionsService);
    await deletePromotionService.execute();
    return response.status(204).send();
  }

  public async showListOfRecommendedPromotionsByPromotionTicket(request: Request, response: Response) {
    const user_id = String(request.user_id);
    const promotion_ticket_id = String(request.params.promotion_ticket_id);
    const showListOfRecommendedPromotionsByPromotionTicketService = container.resolve(ShowListOfRecommendedPromotionsByPromotionTicketService);
    const recommendedPromotions = await showListOfRecommendedPromotionsByPromotionTicketService.execute(user_id, promotion_ticket_id);
    return response.status(200).json(recommendedPromotions);
  }
}

export default PromotionController;
