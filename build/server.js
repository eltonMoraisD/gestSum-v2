"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var app_1 = __importDefault(require("./app"));
var dbConnections_1 = require("../src/typeorm/dbConnections");
app_1.default.listen(3333, function () {
    console.log('🚀 Server started on port 3333!');
});
(0, dbConnections_1.dbCreateConnection)();
//# sourceMappingURL=server.js.map