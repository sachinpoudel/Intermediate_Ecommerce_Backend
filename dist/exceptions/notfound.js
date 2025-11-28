"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const root_1 = require("./root");
class notFound extends root_1.httpException {
    constructor(message, errorCode, errors = null) {
        super(message, errorCode, 404, errors);
    }
}
exports.notFound = notFound;
