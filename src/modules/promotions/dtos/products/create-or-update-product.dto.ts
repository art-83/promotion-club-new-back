import Product from "../../infra/orm/entities/product.entity";

interface CreateOrUpdateProductDTO extends Product {
  image_id: string;
  store_id: string;
}

export default CreateOrUpdateProductDTO;
