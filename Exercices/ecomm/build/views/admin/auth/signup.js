"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var layout_1 = __importDefault(require("../layout"));
var helper_1 = require("../../helper");
exports.default = (function (_a) {
    var req = _a.req, errors = _a.errors;
    return layout_1.default({
        content: "\n    <div class=\"container\">\n        <div class=\"columns is-centered\">\n          <div class=\"column is-one-quarter\">\n            <form method=\"POST\">\n              <h1 class=\"title\">Sign Up</h1>\n              <div class=\"field\">\n                <label class=\"label\">Email</label>\n                <input required class=\"input\" placeholder=\"Email\" name=\"email\" />\n                <p class=\"help is-danger\">" + helper_1.getError(errors, 'email') + "</p>\n              </div>\n              <div class=\"field\">\n                <label class=\"label\">Password</label>\n                <input required class=\"input\" placeholder=\"Password\" name=\"password\" type=\"password\" />\n                <p class=\"help is-danger\">" + helper_1.getError(errors, 'password') + "</p>\n              </div>\n              <div class=\"field\">\n                <label class=\"label\">Password Confirmation</label>\n                <input required class=\"input\" placeholder=\"Password Confirmation\" name=\"passwordConfirmation\" type=\"password\" />\n                <p class=\"help is-danger\">" + helper_1.getError(errors, 'passwordConfirmation') + "</p>\n              </div>\n              <button class=\"button is-primary\">Submit</button>\n            </form>\n            <a href=\"/signin\">Have an account? Sign In</a>\n          </div>\n        </div>\n      </div>\n\n    ",
    });
});
