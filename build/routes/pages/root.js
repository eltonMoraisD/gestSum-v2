"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get('/', function (req, res, next) {
    return res.status(200).header('Content-Type', 'text/html').send("<h4> Resfull api boilerplate</h4>");
});
exports.default = router;
//# sourceMappingURL=root.js.map