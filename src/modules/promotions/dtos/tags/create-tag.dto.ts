import Tag from "../../infra/orm/entities/tag.entity";

interface CreateTagDTO extends Tag {
  store_id: string;
}

export default CreateTagDTO;
