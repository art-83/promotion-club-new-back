import Benefit from "../../infra/orm/entities/benefit.entity";

interface CreateOrUpdateBenefitsDTO extends Benefit {
  benefit_tier_id: string;
  file_id: string;
}

export default CreateOrUpdateBenefitsDTO;
