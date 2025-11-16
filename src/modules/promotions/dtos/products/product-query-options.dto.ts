import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Product from "../../infra/orm/entities/product.entity";

interface ProductsQueryOptionsDTO extends Product, DefaultQueryOptions {
  join_store: boolean;
}

export default ProductsQueryOptionsDTO;
