import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: __dirname + "/../../storage/images",
  filename: (req, file, cb) => {
    const fileName = `${uuidv4()}-${file.originalname}`;
    return cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
