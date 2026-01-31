import StoreCategory from "../../infra/orm/entities/store-category.entity";

interface CreateOrUpdateStoreCategoryDto extends StoreCategory {
  store_id: string;
  category_id: string;
}

export default CreateOrUpdateStoreCategoryDto;
