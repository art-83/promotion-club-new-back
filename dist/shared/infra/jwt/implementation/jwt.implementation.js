"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Jwt {
  encode(data) {
    return jsonwebtoken_1.default.sign(data, String(process.env.JWT_SECRET));
  }
  decode(token) {
    return jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
  }
}
//# sourceMappingURL=jwt.implementation.js.map
