import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCategoryService from "../../../services/categories/create-category.service";
import ShowCategoriesService from "../../../services/categories/show-categories.service";
import DeleteCategoryService from "../../../services/categories/delete-category.service";

class StoreCategoryController {
  public async create(request: Request, response: Response) {
    const createStoreCategoryService = container.resolve(CreateCategoryService);
    const storeCategory = await createStoreCategoryService.execute(request.body);
    return response.status(201).json(storeCategory);
  }

  public async find(request: Request, response: Response) {
    const options = request.query;
    const showStoreCategoriesService = container.resolve(ShowCategoriesService);
    const storeCategories = await showStoreCategoriesService.execute(options);
    return response.status(200).json(storeCategories);
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteStoreCategoryService = container.resolve(DeleteCategoryService);
    await deleteStoreCategoryService.execute(id);
    return response.status(204).send();
  }
}

export default StoreCategoryController;
