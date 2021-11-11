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
exports.initialMigrations1636586289587 = void 0;
var initialMigrations1636586289587 = /** @class */ (function () {
    function initialMigrations1636586289587() {
        this.name = 'initialMigrations1636586289587';
    }
    initialMigrations1636586289587.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"permissions\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"name\" character varying NOT NULL,\n                \"description\" character varying NOT NULL,\n                \"created_at\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(),\n                CONSTRAINT \"UQ_920331560282b8bd21bb02290df\" UNIQUE (\"id\"),\n                CONSTRAINT \"PK_920331560282b8bd21bb02290df\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"role\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"name\" character varying NOT NULL,\n                \"description\" character varying NOT NULL,\n                \"created_at\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(),\n                CONSTRAINT \"UQ_c216a82ffa1e4c6d0224c349272\" UNIQUE (\"description\"),\n                CONSTRAINT \"UQ_b36bcfe02fc8de3c57a8b2391c2\" UNIQUE (\"id\"),\n                CONSTRAINT \"PK_b36bcfe02fc8de3c57a8b2391c2\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"user\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"name\" character varying NOT NULL,\n                \"email\" character varying NOT NULL,\n                \"password\" character varying NOT NULL,\n                \"created_at\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(),\n                CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"),\n                CONSTRAINT \"UQ_cace4a159ff9f2512dd42373760\" UNIQUE (\"id\"),\n                CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"permissions_roles_mapping\" (\n                \"roleId\" uuid NOT NULL,\n                \"permissionId\" uuid NOT NULL,\n                CONSTRAINT \"PK_7b528c492095c19a6d075e53894\" PRIMARY KEY (\"roleId\", \"permissionId\")\n            )\n        ")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE INDEX \"IDX_8c41e3d0e32cc1b3e8d2f99424\" ON \"permissions_roles_mapping\" (\"roleId\")\n        ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE INDEX \"IDX_74dac13eea252fb107cd798c6a\" ON \"permissions_roles_mapping\" (\"permissionId\")\n        ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"users_role_mapping\" (\n                \"userId\" uuid NOT NULL,\n                \"roleId\" uuid NOT NULL,\n                CONSTRAINT \"PK_bb04ad80fbc084a94d943fdf61d\" PRIMARY KEY (\"userId\", \"roleId\")\n            )\n        ")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE INDEX \"IDX_adfe9b385fb1aac65c0f0f142a\" ON \"users_role_mapping\" (\"userId\")\n        ")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE INDEX \"IDX_ed94f165618d00de807f7c190b\" ON \"users_role_mapping\" (\"roleId\")\n        ")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"permissions_roles_mapping\"\n            ADD CONSTRAINT \"FK_8c41e3d0e32cc1b3e8d2f99424d\" FOREIGN KEY (\"roleId\") REFERENCES \"role\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE\n        ")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"permissions_roles_mapping\"\n            ADD CONSTRAINT \"FK_74dac13eea252fb107cd798c6a0\" FOREIGN KEY (\"permissionId\") REFERENCES \"permissions\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE\n        ")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"users_role_mapping\"\n            ADD CONSTRAINT \"FK_adfe9b385fb1aac65c0f0f142ae\" FOREIGN KEY (\"userId\") REFERENCES \"user\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE\n        ")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"users_role_mapping\"\n            ADD CONSTRAINT \"FK_ed94f165618d00de807f7c190b8\" FOREIGN KEY (\"roleId\") REFERENCES \"role\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE\n        ")];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    initialMigrations1636586289587.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"users_role_mapping\" DROP CONSTRAINT \"FK_ed94f165618d00de807f7c190b8\"\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"users_role_mapping\" DROP CONSTRAINT \"FK_adfe9b385fb1aac65c0f0f142ae\"\n        ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"permissions_roles_mapping\" DROP CONSTRAINT \"FK_74dac13eea252fb107cd798c6a0\"\n        ")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"permissions_roles_mapping\" DROP CONSTRAINT \"FK_8c41e3d0e32cc1b3e8d2f99424d\"\n        ")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX \"IDX_ed94f165618d00de807f7c190b\"\n        ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX \"IDX_adfe9b385fb1aac65c0f0f142a\"\n        ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"users_role_mapping\"\n        ")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX \"IDX_74dac13eea252fb107cd798c6a\"\n        ")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX \"IDX_8c41e3d0e32cc1b3e8d2f99424\"\n        ")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"permissions_roles_mapping\"\n        ")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"user\"\n        ")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"role\"\n        ")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"permissions\"\n        ")];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return initialMigrations1636586289587;
}());
exports.initialMigrations1636586289587 = initialMigrations1636586289587;
//# sourceMappingURL=1636586289587-initial-migrations.js.map