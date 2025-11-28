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
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const root_1 = require("../exceptions/root");
const errorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof root_1.httpException) {
        return res.status(err.statusCode).json({
            message: err.message || "Internal Server Error",
            success: false,
            errorCode: err.errorCode || "Unknown Error",
            errors: err.errors || []
        });
    }
});
exports.errorMiddleware = errorMiddleware;
