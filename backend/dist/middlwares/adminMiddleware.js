"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const unAuthorized_1 = require("../exceptions/unAuthorized");
const root_1 = require("../exceptions/root");
const adminMiddleware = (req, res, next) => {
    const user = req.user;
    if (user && user.ROLE === 'ADMIN') {
        next();
    }
    else {
        throw new unAuthorized_1.unAuthorized("Unauthorized access", root_1.ErrorCode.UNAUTHORIZED);
    }
};
exports.adminMiddleware = adminMiddleware;
