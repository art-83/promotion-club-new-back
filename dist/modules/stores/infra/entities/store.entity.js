"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = __importDefault(require("../../../users/infra/orm/entities/user.entity"));
let Store = class Store {
  id;
  street;
  neighborhood;
  city;
  state;
  number;
  user;
};
__decorate([(0, typeorm_1.PrimaryColumn)(), __metadata("design:type", String)], Store.prototype, "id", void 0);
__decorate([(0, typeorm_1.Column)(), __metadata("design:type", String)], Store.prototype, "street", void 0);
__decorate([(0, typeorm_1.Column)(), __metadata("design:type", String)], Store.prototype, "neighborhood", void 0);
__decorate([(0, typeorm_1.Column)(), __metadata("design:type", String)], Store.prototype, "city", void 0);
__decorate([(0, typeorm_1.Column)(), __metadata("design:type", String)], Store.prototype, "state", void 0);
__decorate([(0, typeorm_1.Column)(), __metadata("design:type", Number)], Store.prototype, "number", void 0);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => user_entity_1.default,
      (user) => user.store
    ),
    __metadata("design:type", user_entity_1.default),
  ],
  Store.prototype,
  "user",
  void 0
);
Store = __decorate([(0, typeorm_1.Entity)()], Store);
exports.default = Store;
//# sourceMappingURL=store.entity.js.map
