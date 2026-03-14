import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import PromotionCategory from "../../infra/orm/entities/promotion-category.entity";

interface PromotionCategoryQueryOptionsDto extends DefaultQueryOptions, PromotionCategory {}

export default PromotionCategoryQueryOptionsDto;
