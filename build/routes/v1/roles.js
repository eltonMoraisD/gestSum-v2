"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var RoleController_1 = require("../../controllers/RoleController");
var authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
var router = (0, express_1.Router)();
router.post('/create', authMiddleware_1.default, RoleController_1.CreateRole);
router.get('/list', authMiddleware_1.default, RoleController_1.ListAllRoles);
exports.default = router;
//# sourceMappingURL=roles.js.map