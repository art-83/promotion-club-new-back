"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Permissions;
(function (Permissions) {
    // do not use this permission for now
    Permissions["UPDATE_USER_PERMISSIONS"] = "UPDATE_USER_PERMISSIONS";
    // public permissosn
    Permissions["GET_ME"] = "GET_ME";
    Permissions["SHOW_PROMOTIONS"] = "SHOW_PROMOTIONS";
    Permissions["CREATE_QR_CODE"] = "CREATE_QR_CODE";
    Permissions["SHOW_STORES"] = "SHOW_STORES";
    // store seller permissions
    Permissions["CREATE_PROMOTION"] = "CREATE_PROMOTION";
    Permissions["CREATE_PRODUCT"] = "CREATE_PRODUCT";
    Permissions["CREATE_IMAGE"] = "CREATE_IMAGE";
    Permissions["VALIDATE_QR_CODE"] = "VALIDATE_QR_CODE";
    Permissions["UPDATE_STORE"] = "UPDATE_STORE";
    Permissions["DELETE_STORE"] = "DELETE_STORE";
    // admin permissions
    Permissions["UPDATE_PROMOTION"] = "UPDATE_PROMOTION";
    Permissions["DELETE_PROMOTION"] = "DELETE_PROMOTION";
    Permissions["SHOW_USERS"] = "SHOW_USERS";
    Permissions["SHOW_PRODUCTS"] = "SHOW_PRODUCTS";
    Permissions["UPDATE_PRODUCT"] = "UPDATE_PRODUCT";
    Permissions["DELETE_PRODUCT"] = "DELETE_PRODUCT";
    Permissions["CREATE_STORE"] = "CREATE_STORE";
})(Permissions || (Permissions = {}));
exports.default = Permissions;
//# sourceMappingURL=permissions.js.map