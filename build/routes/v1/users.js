"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../../controllers/UserController");
var authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
var router = (0, express_1.Router)();
router.post('/register', authMiddleware_1.default, UserController_1.createNewUser);
router.get('/list', authMiddleware_1.default, UserController_1.GetAllUsers);
router.put('/update/:id', authMiddleware_1.default, UserController_1.updateUser);
router.delete('/delete/:id', authMiddleware_1.default, UserController_1.DeleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map