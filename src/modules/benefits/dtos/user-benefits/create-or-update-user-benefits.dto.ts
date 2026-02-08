import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import UserBenefit from "../../infra/orm/entities/user-benefit.entity";

interface CreateOrUpdateUserBenefitsDTO extends UserBenefit {
  user_id: string;
  benefit_id: string;
}

export default CreateOrUpdateUserBenefitsDTO;
