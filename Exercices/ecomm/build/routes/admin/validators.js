"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireValidPassword = exports.requireValidEmail = exports.requirePasswordConfirmation = exports.requirePassword = exports.requireEmail = exports.requirePrice = exports.requireTitle = void 0;
var express_validator_1 = require("express-validator");
var users_1 = __importDefault(require("../../repositories/users"));
var requireTitle = express_validator_1.check('title')
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage('Must be between 4 and 40 characters');
exports.requireTitle = requireTitle;
var requirePrice = express_validator_1.check('price')
    .trim()
    .toFloat()
    .isFloat({ min: 0.01 })
    .withMessage('Must be a number greater than 0.01');
exports.requirePrice = requirePrice;
var requireEmail = express_validator_1.check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users_1.default.getOneBy({ email: email })];
            case 1:
                existingUser = _a.sent();
                if (existingUser) {
                    throw new Error('Email in use');
                }
                return [2 /*return*/];
        }
    });
}); });
exports.requireEmail = requireEmail;
var requirePassword = express_validator_1.check('password')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Must be between 4 and 20 characters');
exports.requirePassword = requirePassword;
var requirePasswordConfirmation = express_validator_1.check('passwordConfirmation')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Must be between 4 and 20 characters')
    .custom(function (passwordConfirmation, _a) {
    var req = _a.req;
    if (passwordConfirmation !== req.body.password) {
        throw new Error('Password must match');
    }
    else {
        return true;
    }
});
exports.requirePasswordConfirmation = requirePasswordConfirmation;
var requireValidEmail = express_validator_1.check('email')
    .trim()
    .normalizeEmail()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valide email')
    .custom(function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users_1.default.getOneBy({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('Email not found!');
                }
                return [2 /*return*/];
        }
    });
}); });
exports.requireValidEmail = requireValidEmail;
var requireValidPassword = express_validator_1.check('password')
    .trim()
    .custom(function (password, _a) {
    var req = _a.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, validPassword;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, users_1.default.getOneBy({ email: req.body.email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new Error('Invalide password!');
                    }
                    return [4 /*yield*/, users_1.default.comparePasswords(user.password, password)];
                case 2:
                    validPassword = _b.sent();
                    if (!validPassword) {
                        throw new Error('Invalide password!');
                    }
                    return [2 /*return*/];
            }
        });
    });
});
exports.requireValidPassword = requireValidPassword;
