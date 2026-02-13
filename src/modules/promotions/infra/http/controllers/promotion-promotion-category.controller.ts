import { Request, Response } from "express";
import { container } from "tsyringe";
import CreatePromotionPromotionCategoryService from "../../../services/promotion-promotion-categories/create-promotion-promotion-category.service";
import ShowPromotionPromotionCategoriesService from "../../../services/promotion-promotion-categories/show-promotion-promotion-categories.service";
import UpdatePromotionPromotionCategoryService from "../../../services/promotion-promotion-categories/update-promotion-promotion-category.service";
import DeletePromotionPromotionCategoryService from "../../../services/promotion-promotion-categories/delete-promotion-promotion-category.service";

class PromotionPromotionCategoryController {
  public async create(request: Request, response: Response) {
    const data = request.body;
    const createPromotionPromotionCategory = container.resolve(CreatePromotionPromotionCategoryService);
    const promotionPromotionCategory = await createPromotionPromotionCategory.execute(data);
    return response.status(201).json(promotionPromotionCategory);
  }

  public async find(request: Request, response: Response) {
    const options = request.query;
    const showPromotionPromotionCategories = container.resolve(ShowPromotionPromotionCategoriesService);
    const promotionPromotionCategories = await showPromotionPromotionCategories.execute(options);
    return response.status(200).json(promotionPromotionCategories);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const data = request.body;
    const updatePromotionPromotionCategory = container.resolve(UpdatePromotionPromotionCategoryService);
    await updatePromotionPromotionCategory.execute(id, data);
    return response.status(204).send();
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deletePromotionPromotionCategory = container.resolve(DeletePromotionPromotionCategoryService);
    await deletePromotionPromotionCategory.execute(id);
    return response.status(204).send();
  }
}

export default PromotionPromotionCategoryController;
