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
exports.DeleteUser = exports.updateUser = exports.createNewUser = exports.GetAllUsers = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../typeorm/entities/User");
//TODO -> listar user by id,
var GetAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepository, users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepository = (0, typeorm_1.getRepository)(User_1.User);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userRepository.find({
                        relations: ['roles'],
                        select: ['id', 'name', 'email'],
                    })];
            case 2:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Alguma coisa deu errado !" + error_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetAllUsers = GetAllUsers;
var createNewUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, userRepository, user, newUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, name = _a.name, email = _a.email, password = _a.password;
                userRepository = (0, typeorm_1.getRepository)(User_1.User);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userRepository.findOne({ where: { email: email } })];
            case 2:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, response.status(409).json({ message: 'Usuario já existe' })];
                }
                newUser = new User_1.User();
                newUser.name = name;
                newUser.email = email;
                newUser.password = password;
                newUser.generateUUID();
                newUser.hashPassword();
                return [4 /*yield*/, userRepository.save(newUser)];
            case 3:
                _b.sent();
                return [2 /*return*/, response.status(201).json({ message: 'Usuario criado com sucesso' })];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, response
                        .status(500)
                        .json({ error: "Alguma coisa deu errado " + error_2 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createNewUser = createNewUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, email, oldPassword, password, userRepository, user, userExist, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, email = _a.email, oldPassword = _a.oldPassword, password = _a.password;
                userRepository = (0, typeorm_1.getRepository)(User_1.User);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, userRepository.findOne({
                        where: { id: id },
                        select: ['id', 'name', 'email'],
                    })];
            case 2:
                user = _b.sent();
                if (!(email !== user.email)) return [3 /*break*/, 4];
                return [4 /*yield*/, userRepository.findOne({ where: { email: email } })];
            case 3:
                userExist = _b.sent();
                if (userExist) {
                    return [2 /*return*/, res.status(400).json({
                            error: 'Usuario já está em uso',
                        })];
                }
                _b.label = 4;
            case 4:
                // if (oldPassword && !user.checkIfPasswordMatch(oldPassword)) {
                //   return res
                //     .status(401)
                //     .json({ error: 'A senha não coincide com a antiga' });
                // }
                user.email = email;
                user.name = name;
                return [4 /*yield*/, userRepository.save(user)];
            case 5:
                _b.sent();
                return [2 /*return*/, res.json({
                        id: user.id,
                        name: name,
                        email: email,
                    })];
            case 6:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Alguma coisa deu errado! " + error_3 })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var DeleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userRepository, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                userRepository = (0, typeorm_1.getRepository)(User_1.User);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userRepository.findOne({ where: { id: id } })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: 'Usuario não encontrado' })];
                }
                return [4 /*yield*/, userRepository.remove(user)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ message: 'Usuário deletado com sucesso' })];
            case 4:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'alguma coisa deu errado' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.DeleteUser = DeleteUser;
//# sourceMappingURL=UserController.js.map