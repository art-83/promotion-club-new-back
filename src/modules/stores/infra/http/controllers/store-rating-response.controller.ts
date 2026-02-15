import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowStoreRatingResponsesService from "../../../services/store-rating-responses/show-store-rating-responses.service";
import CreateStoreRatingResponseService from "../../../services/store-rating-responses/create-store-rating-response.service-and-notify-customer.service";
import UpdateStoreRatingResponseService from "../../../services/store-rating-responses/update-store-rating-response.service";
import DeleteStoreRatingResponseService from "../../../services/store-rating-responses/delete-store-rating-response.service";

class StoreRatingResponseController {
  public async show(request: Request, response: Response) {
    const options = request.query;
    const showStoreRatingResponsesService = container.resolve(ShowStoreRatingResponsesService);
    const storeRatingResponses = await showStoreRatingResponsesService.execute(options);
    return response.status(200).json(storeRatingResponses);
  }

  public async create(request: Request, response: Response) {
    const createStoreRatingResponseService = container.resolve(CreateStoreRatingResponseService);
    const storeRatingResponse = await createStoreRatingResponseService.execute(request.body);
    return response.status(201).json(storeRatingResponse);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updateStoreRatingResponseService = container.resolve(UpdateStoreRatingResponseService);
    await updateStoreRatingResponseService.execute(id, request.body);
    return response.status(204).send();
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteStoreRatingResponseService = container.resolve(DeleteStoreRatingResponseService);
    await deleteStoreRatingResponseService.execute(id);
    return response.status(204).send();
  }
}

export default StoreRatingResponseController;
