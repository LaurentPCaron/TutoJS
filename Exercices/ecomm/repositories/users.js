"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var UsersRepository = /** @class */ (function () {
    function UsersRepository(filename) {
        this.filename = filename;
        try {
            fs_1.accessSync(this.filename);
        }
        catch (error) {
            fs_1.writeFileSync(this.filename, '[]');
        }
    }
    return UsersRepository;
}());
var repo = new UsersRepository('user.json');
