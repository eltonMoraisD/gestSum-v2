"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var authConfig_1 = __importDefault(require("../typeorm/config/authConfig"));
function default_1(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(401)
            .json({ error: 'Acesso negado, precisas estar logado' });
    }
    var token = authHeader.split(' ')[1];
    try {
        var decoded = (0, jsonwebtoken_1.verify)(token, authConfig_1.default.secret);
        req.body.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: 'token invalido' });
    }
}
exports.default = default_1;
//# sourceMappingURL=authMiddleware.js.map