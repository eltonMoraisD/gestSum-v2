"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PermissionController_1 = require("../../controllers/PermissionController");
var authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
var router = (0, express_1.Router)();
router.post('/create', authMiddleware_1.default, PermissionController_1.CreatePermission);
router.get('/list', authMiddleware_1.default, PermissionController_1.ListAllPermissions);
exports.default = router;
//# sourceMappingURL=permission.js.map