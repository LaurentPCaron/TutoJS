"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
var express_validator_1 = require("express-validator");
var handleErrors = function (templateFunc) {
    return function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(templateFunc({ errors: errors }));
        }
        next();
    };
};
exports.handleErrors = handleErrors;
