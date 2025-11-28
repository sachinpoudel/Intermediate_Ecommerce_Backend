"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unAuthorized = void 0;
const root_1 = require("./root");
class unAuthorized extends root_1.httpException {
    constructor(message, errorCode, errors = null) {
        super(message, errorCode, 401, errors);
    }
}
exports.unAuthorized = unAuthorized;
