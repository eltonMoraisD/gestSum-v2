"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes/routes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('tiny'));
app.use(routes_1.default);
app.use(function (req, res, next) {
    return res.status(404).json({ message: 'Page Not Found' });
});
app.use(function (err, req, res, next) {
    return res.status(500).json({ message: "Internal Error" });
});
exports.default = app;
//# sourceMappingURL=app.js.map