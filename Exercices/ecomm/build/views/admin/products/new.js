"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var layout_1 = __importDefault(require("../layout"));
var helper_1 = require("../../helper");
exports.default = (function (_a) {
    var errors = _a.errors;
    return layout_1.default({
        content: "\n    <div class=\"columns is-centered\">\n    <div class=\"column is-half\">\n      <h1 class=\"subtitle\">Create a Product</h1>\n\n      <form method=\"POST\" enctype=\"multipart/form-data\">\n        <div class=\"field\">\n          <label class=\"label\">Title</label>\n          <input class=\"input\" placeholder=\"Title\" name=\"title\">\n          <p class=\"help is-danger\">" + helper_1.getError(errors, 'title') + "</p>\n        </div>\n        \n        <div class=\"field\">\n          <label class=\"label\">Price</label>\n          <input class=\"input\" placeholder=\"Price\" name=\"price\">\n          <p class=\"help is-danger\">" + helper_1.getError(errors, 'price') + "</p>\n        </div>\n        \n        <div class=\"field\">\n          <label class=\"label\">Image</label>            \n          <input type=\"file\" name=\"image\" />\n        </div>\n        <br />\n        <button class=\"button is-primary\">Create</button>\n      </form>\n    </div>\n  </div>\n\n        ",
    });
});
