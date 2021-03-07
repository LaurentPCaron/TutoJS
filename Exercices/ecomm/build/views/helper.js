"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getError = void 0;
var getError = function (errors, prop) {
    try {
        return errors.mapped()[prop].msg;
    }
    catch (err) {
        return '';
    }
};
exports.getError = getError;
