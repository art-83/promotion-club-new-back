import StoreCategory from "../../infra/orm/entities/store-category.entity";

interface CreateCategoryDto extends StoreCategory {
  name: string;
}

export default CreateCategoryDto;
