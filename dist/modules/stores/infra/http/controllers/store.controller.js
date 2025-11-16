"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_store_service_1 = __importDefault(require("../../../services/create-store.service"));
const delete_store_service_1 = __importDefault(require("../../../services/delete-store.service"));
const show_stores_service_1 = __importDefault(require("../../../services/show-stores.service"));
const update_store_service_1 = __importDefault(require("../../../services/update-store.service"));
const tsyringe_1 = require("tsyringe");
class StoreController {
    async create(request, response) {
        const createStoreService = tsyringe_1.container.resolve(create_store_service_1.default);
        const createStore = await createStoreService.execute(request.body);
        return response.status(201).json(createStore);
    }
    async show(request, response) {
        const showStoresService = tsyringe_1.container.resolve(show_stores_service_1.default);
        const showStores = await showStoresService.execute(request.query);
        return response.status(200).json(showStores);
    }
    async update(request, response) {
        const id = String(request.params.id);
        const updateStoreService = tsyringe_1.container.resolve(update_store_service_1.default);
        const updateStore = await updateStoreService.execute(id, request.body);
        return response.status(200).json(updateStore);
    }
    async delete(request, response) {
        const id = String(request.params.id);
        const deleteStoreService = tsyringe_1.container.resolve(delete_store_service_1.default);
        await deleteStoreService.execute(id);
        return response.status(204).send();
    }
}
exports.default = StoreController;
//# sourceMappingURL=store.controller.js.map