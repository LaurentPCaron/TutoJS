"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var auth_1 = __importDefault(require("./routes/admin/auth"));
var products_1 = __importDefault(require("./routes/admin/products"));
var app = express_1.default();
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({
    keys: ['tf2YN1uPWjHzPWhK3npE'],
}));
app.use(auth_1.default);
app.use(products_1.default);
app.listen(3000, function () {
    console.log("J'técoute");
});
