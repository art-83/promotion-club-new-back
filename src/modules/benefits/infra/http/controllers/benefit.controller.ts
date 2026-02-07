import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowBenefitsService from "../../../services/benefits/show-benefits.service";
import CreateBenefitService from "../../../services/benefits/create-benefit.service";
import UpdateBenefitService from "../../../services/benefits/update-benefit.service";
import DeleteBenefitService from "../../../services/benefits/delete-benefit.service";

class BenefitController {
  public async show(request: Request, response: Response) {
    const showBenefitsService = container.resolve(ShowBenefitsService);
    const benefits = await showBenefitsService.execute(request.query);
    return response.status(200).json(benefits);
  }

  public async create(request: Request, response: Response) {
    const createBenefitService = container.resolve(CreateBenefitService);
    const benefit = await createBenefitService.execute(request.body);
    return response.status(201).json(benefit);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updateBenefitService = container.resolve(UpdateBenefitService);
    await updateBenefitService.execute(id, request.body);
    return response.status(200).send();
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteBenefitService = container.resolve(DeleteBenefitService);
    await deleteBenefitService.execute(id);
    return response.status(204).send();
  }
}

export default BenefitController;
