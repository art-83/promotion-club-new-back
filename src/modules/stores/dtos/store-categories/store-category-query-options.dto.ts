import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import StoreCategory from "../../infra/orm/entities/store-category.entity";

interface StoreCategoryQueryOptionsDto extends StoreCategory, DefaultQueryOptions {
  store_id: string;
  category_id: string;
}

export default StoreCategoryQueryOptionsDto;
