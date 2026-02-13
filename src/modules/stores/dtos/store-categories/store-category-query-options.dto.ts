import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import StoreStoreCategory from "../../infra/orm/entities/store-store-category.entity";

interface StoreCategoryQueryOptionsDto extends StoreStoreCategory, DefaultQueryOptions {
  store_id: string;
  category_id: string;
}

export default StoreCategoryQueryOptionsDto;
