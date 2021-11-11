"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var uuid_1 = require("uuid");
var typeorm_1 = require("typeorm");
var Role_1 = require("./Role");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.generateUUID = function () {
        this.id = (0, uuid_1.v4)();
    };
    User.prototype.hashPassword = function () {
        this.password = bcryptjs_1.default.hashSync(this.password, 8);
    };
    // ------------------------------------//
    User.prototype.checkIfPasswordMatch = function (unencryptedPassword) {
        return bcryptjs_1.default.compareSync(unencryptedPassword, this.password);
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar'),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { select: false }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Role_1.Role; }),
        (0, typeorm_1.JoinTable)({
            name: 'users_role_mapping',
            joinColumns: [{ name: 'userId' }],
            inverseJoinColumns: [{ name: 'roleId' }],
        }),
        __metadata("design:type", Array)
    ], User.prototype, "roles", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['id'])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map