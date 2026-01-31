import { Request, Response } from "express";
import { container } from "tsyringe";
import CreatePromotionTagService from "../../../services/promotion-tags/create-promotion-tag.service";
import ShowPromotionTagsService from "../../../services/promotion-tags/show-promotion-tags.service";
import UpdatePromotionTagService from "../../../services/promotion-tags/update-promotion-tag.service";
import DeletePromotionTagService from "../../../services/promotion-tags/delete-promotion-tag.service";
import AppError from "../../../../../shared/infra/http/errors/app-error";

class PromotionTagController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const createPromotionTag = container.resolve(CreatePromotionTagService);
    const promotionTag = await createPromotionTag.execute(data);
    return response.status(201).json(promotionTag);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const options = request.query;
    const showPromotionTags = container.resolve(ShowPromotionTagsService);
    const promotionTags = await showPromotionTags.execute(options);
    return response.status(200).json(promotionTags);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;
    if (!id) throw new AppError(400, "ID is required.");
    const updatePromotionTag = container.resolve(UpdatePromotionTagService);
    await updatePromotionTag.execute(id, data);
    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) throw new AppError(400, "ID is required.");
    const deletePromotionTag = container.resolve(DeletePromotionTagService);
    await deletePromotionTag.execute(id);
    return response.status(204).send();
  }
}

export default PromotionTagController;
