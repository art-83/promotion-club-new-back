import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Tag from "../../infra/orm/entities/tag.entity";

interface TagQueryOptionDTO extends Tag, DefaultQueryOptions {
  store_id: string;
}

export default TagQueryOptionDTO;
