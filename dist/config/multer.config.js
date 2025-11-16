"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: __dirname + "/../../storage/images",
    filename: (req, file, cb) => {
        const fileName = `${(0, uuid_1.v4)()}-${file.originalname}`;
        return cb(null, fileName);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
//# sourceMappingURL=multer.config.js.map