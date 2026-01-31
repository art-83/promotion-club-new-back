import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCategoryService from "../../../services/categories/create-category.service";
import ShowCategoriesService from "../../../services/categories/show-categories.service";
import DeleteCategoryService from "../../../services/categories/delete-category.service";

class CategoryController {
  public async create(request: Request, response: Response) {
    const createCategoryService = container.resolve(CreateCategoryService);
    const category = await createCategoryService.execute(request.body);
    return response.status(201).json(category);
  }

  public async find(request: Request, response: Response) {
    const options = request.query;
    const showCategoriesService = container.resolve(ShowCategoriesService);
    const categories = await showCategoriesService.execute(options);
    return response.status(200).json(categories);
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteCategoryService = container.resolve(DeleteCategoryService);
    await deleteCategoryService.execute(id);
    return response.status(204).send();
  }
}

export default CategoryController;
