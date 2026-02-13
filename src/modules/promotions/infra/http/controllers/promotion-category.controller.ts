import { Request, Response } from "express";
import { container } from "tsyringe";
import CreatePromotionCategoryService from "../../../services/promotion-categories/create-promotion-category.service";
import ShowPromotionCategoriesService from "../../../services/promotion-categories/show-promotion-categories.service";
import DeletePromotionCategoryService from "../../../services/promotion-categories/delete-promotion-category.service";

class PromotionCategoryController {
  public async create(request: Request, response: Response) {
    const createPromotionCategoryService = container.resolve(CreatePromotionCategoryService);
    const promotionCategory = await createPromotionCategoryService.execute(request.body);
    return response.status(201).json(promotionCategory);
  }

  public async find(request: Request, response: Response) {
    const options = request.query;
    const showPromotionCategoriesService = container.resolve(ShowPromotionCategoriesService);
    const promotionCategories = await showPromotionCategoriesService.execute(options);
    return response.status(200).json(promotionCategories);
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deletePromotionCategoryService = container.resolve(DeletePromotionCategoryService);
    await deletePromotionCategoryService.execute(id);
    return response.status(204).send();
  }
}

export default PromotionCategoryController;
