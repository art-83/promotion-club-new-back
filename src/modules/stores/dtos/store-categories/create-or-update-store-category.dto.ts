import StoreStoreCategory from "../../infra/orm/entities/store-store-category.entity";

interface CreateOrUpdateStoreCategoryDto extends StoreStoreCategory {
  store_id: string;
  category_id: string;
}

export default CreateOrUpdateStoreCategoryDto;
