"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.httpException = void 0;
class httpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message,
            this.errorCode = errorCode,
            this.statusCode = statusCode,
            this.errors = errors;
    }
}
exports.httpException = httpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    ErrorCode["USER_ALREADY_EXISTS"] = "USER_ALREADY_EXISTS";
    ErrorCode["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    ErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorCode["BAD_REQUEST"] = "BAD_REQUEST";
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["CONFLICT"] = "CONFLICT";
    ErrorCode["UNPROCESSABLE_ENTITY"] = "UNPROCESSABLE_ENTITY";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
