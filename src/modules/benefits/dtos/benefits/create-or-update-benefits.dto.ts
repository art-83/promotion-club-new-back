import Benefit from "../../infra/orm/entities/benefit.entity";

interface CreateOrUpdateBenefitsDTO extends Benefit {
  store_id: string;
  image_id: string;
}

export default CreateOrUpdateBenefitsDTO;
