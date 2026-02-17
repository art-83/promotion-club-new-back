import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Benefit from "../../infra/orm/entities/benefit.entity";

interface BenefitsQueryOptionsDTO extends Benefit, DefaultQueryOptions {
  benefit_tier_id: string;
  join_image: boolean;
  join_benefit_tier: boolean;
}

export default BenefitsQueryOptionsDTO;
