"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get('*', function (req, res, next) {
    return res.status(404).json('404 Not Found');
});
exports.default = router;
//# sourceMappingURL=404.js.map