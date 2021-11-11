"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../../controllers/AuthController");
var UserController_1 = require("../../controllers/UserController");
var authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
var router = (0, express_1.Router)();
router.get('/users', authMiddleware_1.default, UserController_1.GetAllUsers);
router.post('/register', authMiddleware_1.default, UserController_1.createNewUser);
router.put('/update/:id', authMiddleware_1.default, UserController_1.updateUser);
router.delete('/delete/:id', authMiddleware_1.default, UserController_1.DeleteUser);
router.post('/login', AuthController_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map