import { Request } from "express";
interface CreateImageDTO extends Request<{}, {}, {
    product_id: string;
}> {
}
export default CreateImageDTO;
//# sourceMappingURL=create-image.dto.d.ts.map