import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateStoreCategoryService from "../../../services/store-categories/create-store-category.service";
import ShowStoreCategoriesService from "../../../services/store-categories/show-store-categories.service";
import UpdateStoreCategoryService from "../../../services/store-categories/update-store-category.service";
import DeleteStoreCategoryService from "../../../services/store-categories/delete-store-category.service";

class StoreStoreCategoryController {
  public async create(request: Request, response: Response) {
    const data = request.body;
    const createStoreStoreCategory = container.resolve(CreateStoreCategoryService);
    const storeStoreCategory = await createStoreStoreCategory.execute(data);
    return response.status(201).json(storeStoreCategory);
  }

  public async find(request: Request, response: Response) {
    const options = request.query;
    const showStoreStoreCategories = container.resolve(ShowStoreCategoriesService);
    const storeStoreCategories = await showStoreStoreCategories.execute(options);
    return response.status(200).json(storeStoreCategories);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const data = request.body;
    const updateStoreStoreCategory = container.resolve(UpdateStoreCategoryService);
    await updateStoreStoreCategory.execute(id, data);
    return response.status(204).send();
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteStoreStoreCategory = container.resolve(DeleteStoreCategoryService);
    await deleteStoreStoreCategory.execute(id);
    return response.status(204).send();
  }
}

export default StoreStoreCategoryController;
