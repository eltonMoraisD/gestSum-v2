"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllRoles = exports.CreateRole = void 0;
var typeorm_1 = require("typeorm");
var Role_1 = require("../typeorm/entities/Role");
var CreateRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleRepository, _a, name, description, permissions, isRoleNameExist, role, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                roleRepository = (0, typeorm_1.getRepository)(Role_1.Role);
                _a = req.body, name = _a.name, description = _a.description, permissions = _a.permissions;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, roleRepository.findOne({ where: { name: name } })];
            case 2:
                isRoleNameExist = _b.sent();
                if (isRoleNameExist) {
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: 'Este Role jã existe na base de dados' })];
                }
                role = roleRepository.create({
                    name: name,
                    description: description,
                    // permission: existingPermissions,
                });
                return [4 /*yield*/, roleRepository.save(role)];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json(role)];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Alguma coisa deu errado! " + error_1 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.CreateRole = CreateRole;
var ListAllRoles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleRepository, allRoles, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roleRepository = (0, typeorm_1.getRepository)(Role_1.Role);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, roleRepository.find({
                        select: ['id', 'name', 'description'],
                    })];
            case 2:
                allRoles = _a.sent();
                return [2 /*return*/, res.json(allRoles)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Alguma coisa deu errado! " + error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.ListAllRoles = ListAllRoles;
//TODO - list roles by id, delete role, update role
//# sourceMappingURL=RoleController.js.map