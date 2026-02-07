import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Benefit from "../../infra/orm/entities/benefit.entity";

interface BenefitsQueryOptionsDTO extends Benefit, DefaultQueryOptions {
  store_id: string;
  join_image: boolean;
}

export default BenefitsQueryOptionsDTO;