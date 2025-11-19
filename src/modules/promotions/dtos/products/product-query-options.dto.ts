import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Product from "../../infra/orm/entities/product.entity";

interface ProductsQueryOptionsDTO extends Product, DefaultQueryOptions {
  start_price: number;
  end_price: number;

  store_id: boolean;

  join_store: boolean;
  join_image: boolean;
}

export default ProductsQueryOptionsDTO;
