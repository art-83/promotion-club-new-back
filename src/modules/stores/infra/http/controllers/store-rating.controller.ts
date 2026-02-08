import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowStoreRatingsService from "../../../services/store-ratings/show-store-ratings.service";
import CreateStoreRatingService from "../../../services/store-ratings/create-store-rating.service";
import UpdateStoreRatingService from "../../../services/store-ratings/update-store-rating.service";
import DeleteStoreRatingService from "../../../services/store-ratings/delete-store-rating.service";

class StoreRatingController {
  public async show(request: Request, response: Response) {
    const options = request.query;
    const showStoreRatingsService = container.resolve(ShowStoreRatingsService);
    const storeRatings = await showStoreRatingsService.execute(options);
    return response.status(200).json(storeRatings);
  }

  public async create(request: Request, response: Response) {
    const createStoreRatingService = container.resolve(CreateStoreRatingService);
    const storeRating = await createStoreRatingService.execute(request.body);
    return response.status(201).json(storeRating);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updateStoreRatingService = container.resolve(UpdateStoreRatingService);
    await updateStoreRatingService.execute(id, request.body);
    return response.status(204).send();
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteStoreRatingService = container.resolve(DeleteStoreRatingService);
    await deleteStoreRatingService.execute(id);
    return response.status(204).send();
  }
}

export default StoreRatingController;
