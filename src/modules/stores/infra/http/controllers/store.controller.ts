import StoreQueryOptionsDTO from "../../../dtos/stores/store-query-options.dto";
import CreateStoreService from "../../../services/stores/create-store.service";
import DeleteStoreService from "../../../services/stores/delete-store.service";
import ShowStoresServices from "../../../services/stores/show-stores.service";
import UpdateStoreService from "../../../services/stores/update-store.service";
import { Request, Response } from "express";
import { container } from "tsyringe";

class StoreController {
  public async create(request: Request, response: Response) {
    const createStoreService = container.resolve(CreateStoreService);
    const createStore = await createStoreService.execute(request.body);
    return response.status(201).json(createStore);
  }

  public async show(request: Request, response: Response) {
    const showStoresService = container.resolve(ShowStoresServices);
    const showStores = await showStoresService.execute(request.query);
    return response.status(200).json(showStores);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updateStoreService = container.resolve(UpdateStoreService);
    const updateStore = await updateStoreService.execute(id, request.body);
    return response.status(200).json(updateStore);
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteStoreService = container.resolve(DeleteStoreService);
    await deleteStoreService.execute(id);
    return response.status(204).send();
  }
}

export default StoreController;
