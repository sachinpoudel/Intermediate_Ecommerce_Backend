"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequest = void 0;
const root_1 = require("./root");
class badRequest extends root_1.httpException {
    constructor(message, errorCode) {
        super(message, errorCode, 401, null);
    }
}
exports.badRequest = badRequest;
