import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Category from "../../infra/orm/entities/category.entity";

interface CategoryQueryOptionsDto extends Category, DefaultQueryOptions {}

export default CategoryQueryOptionsDto;
