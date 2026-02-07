import Benefit from "../../infra/orm/entities/benefit.entity";

interface CreateOrUpdateBenefitsDTO extends Benefit {
  image_id: string;
}

export default CreateOrUpdateBenefitsDTO;
