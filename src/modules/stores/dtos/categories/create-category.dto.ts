import Category from "../../infra/orm/entities/category.entity";

interface CreateCategoryDto extends Category {
  name: string;
}

export default CreateCategoryDto;
