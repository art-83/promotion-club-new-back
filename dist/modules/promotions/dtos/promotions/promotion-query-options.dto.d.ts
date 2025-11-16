import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Promotion from "../../infra/orm/entities/promotion.entity";
interface PromotionQueryOptionsDTO extends Promotion, DefaultQueryOptions {
    join_product: boolean;
}
export default PromotionQueryOptionsDTO;
//# sourceMappingURL=promotion-query-options.dto.d.ts.map