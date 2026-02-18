import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateFileService from "../../../services/create-file.service";

class FileController {
  public async create(request: Request, response: Response) {
    const createFileService = container.resolve(CreateFileService);
    const file = await createFileService.execute(request);
    return response.status(201).json(file);
  }
}

export default FileController;
