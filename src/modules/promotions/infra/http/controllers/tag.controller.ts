import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateTagService from "../../../services/tags/create-tag.service";
import ShowTagsService from "../../../services/tags/show-tag.service";

class TagController {
  public async create(request: Request, response: Response) {
    const data = request.body;
    const createTag = container.resolve(CreateTagService);
    const tag = await createTag.execute(data);
    return response.status(201).json(tag);
  }

  public async find(request: Request, response: Response) {
    const options = request.query;
    const showTags = container.resolve(ShowTagsService);
    const tags = await showTags.execute(options);
    return response.status(200).json(tags);
  }
}

export default TagController;
