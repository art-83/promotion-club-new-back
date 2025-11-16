import Image from "../../../images/infra/orm/entities/image.entity";
import Product from "../../infra/orm/entities/product.entity";

interface CreateProductDTO extends Product {
  image_id: string;
}

export default CreateProductDTO;
