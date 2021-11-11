"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./auth"));
var users_1 = __importDefault(require("./users"));
var roles_1 = __importDefault(require("./roles"));
var permission_1 = __importDefault(require("./permission"));
var router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/users', users_1.default);
router.use('/roles', roles_1.default);
router.use('/permission', permission_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map