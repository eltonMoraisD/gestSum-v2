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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var typeorm_1 = require("typeorm");
var Permission_1 = require("./Permission");
var Role = /** @class */ (function () {
    function Role() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Role.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar'),
        __metadata("design:type", String)
    ], Role.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { unique: true }),
        __metadata("design:type", String)
    ], Role.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Role.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Role.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Permission_1.Permission; }),
        (0, typeorm_1.JoinTable)({
            name: 'permissions_roles_mapping',
            joinColumns: [{ name: 'roleId' }],
            inverseJoinColumns: [{ name: 'permissionId' }],
        }),
        __metadata("design:type", Array)
    ], Role.prototype, "permission", void 0);
    Role = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['id'])
    ], Role);
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=Role.js.map