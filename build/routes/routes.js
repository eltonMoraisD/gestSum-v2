"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var _404_1 = __importDefault(require("./pages/404"));
var root_1 = __importDefault(require("./pages/root"));
var v1_1 = __importDefault(require("./v1"));
var router = (0, express_1.Router)();
router.use("/v1", v1_1.default);
router.use(_404_1.default);
router.use(root_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map