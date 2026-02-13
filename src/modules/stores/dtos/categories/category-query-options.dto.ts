import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import StoreCategory from "../../infra/orm/entities/store-category.entity";

interface CategoryQueryOptionsDto extends StoreCategory, DefaultQueryOptions {}

export default CategoryQueryOptionsDto;
