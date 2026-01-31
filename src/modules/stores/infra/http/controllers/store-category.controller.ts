import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateStoreCategoryService from "../../../services/store-categories/create-store-category.service";
import ShowStoreCategoriesService from "../../../services/store-categories/show-store-categories.service";
import UpdateStoreCategoryService from "../../../services/store-categories/update-store-category.service";
import DeleteStoreCategoryService from "../../../services/store-categories/delete-store-category.service";
import AppError from "../../../../../shared/infra/http/errors/app-error";

class StoreCategoryController {
  public async create(request: Request, response: Response) {
    const data = request.body;
    const createStoreCategory = container.resolve(CreateStoreCategoryService);
    const storeCategory = await createStoreCategory.execute(data);
    return response.status(201).json(storeCategory);
  }

  public async find(request: Request, response: Response) {
    const options = request.query;
    const showStoreCategories = container.resolve(ShowStoreCategoriesService);
    const storeCategories = await showStoreCategories.execute(options);
    return response.status(200).json(storeCategories);
  }

  public async update(request: Request, response: Response) {
    const id  = String(request.params.id);
    const data = request.body;
    const updateStoreCategory = container.resolve(UpdateStoreCategoryService);
    await updateStoreCategory.execute(id, data);
    return response.status(204).send();
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteStoreCategory = container.resolve(DeleteStoreCategoryService);
    await deleteStoreCategory.execute(id);
    return response.status(204).send();
  }
}

export default StoreCategoryController;
