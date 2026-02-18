import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const fileStorage = multer.diskStorage({
  destination: __dirname + "/../../../../storage/files",
  filename: (req, file, cb) => {
    const fileName = `${uuidv4()}-${file.originalname}`;
    return cb(null, fileName);
  },
});

const fileUploader = multer({ storage: fileStorage });

export default fileUploader;
