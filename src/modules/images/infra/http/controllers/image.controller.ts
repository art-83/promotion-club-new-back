import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateImageService from "../../../services/create-image.service";

class ImageController {
  public async create(request: Request, response: Response) {
    const createImageService = container.resolve(CreateImageService);
    const image = await createImageService.execute(request);
    return response.status(201).json(image);
  }
}

export default ImageController;
