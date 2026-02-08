import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import UserBenefit from "../../infra/orm/entities/user-benefit.entity";

interface UserBenefitsQueryOptionsDTO extends UserBenefit, DefaultQueryOptions {
  user_id: string;
  benefit_id: string;
}

export default UserBenefitsQueryOptionsDTO;
