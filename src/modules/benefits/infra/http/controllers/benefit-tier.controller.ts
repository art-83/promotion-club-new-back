import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowBenefitTiersService from "../../../services/benefit-tiers/show-benefit-tiers.service";
import UpdateBenefitTierService from "../../../services/benefit-tiers/update-benefit-tier.service";

class BenefitTierController {
  public async show(request: Request, response: Response) {
    const showBenefitTiersService = container.resolve(ShowBenefitTiersService);
    const tiers = await showBenefitTiersService.execute(request.query);
    return response.status(200).json(tiers);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updateBenefitTierService = container.resolve(UpdateBenefitTierService);
    await updateBenefitTierService.execute(id, request.body);
    return response.status(200).send();
  }
}

export default BenefitTierController;
