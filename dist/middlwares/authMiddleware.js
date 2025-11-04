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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const unAuthorized_1 = require("../exceptions/unAuthorized");
const root_1 = require("../exceptions/root");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../secret");
const __1 = require("..");
const notfound_1 = require("../exceptions/notfound");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new unAuthorized_1.unAuthorized("Unauthorized access", root_1.ErrorCode.UNAUTHORIZED);
        }
        if (!secret_1.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret_1.JWT_SECRET);
        const user = yield __1.prisma.user.findFirst({
            where: {
                id: decoded.userId
            }
        });
        if (!user) {
            throw new notfound_1.notFound("User not found", root_1.ErrorCode.USER_NOT_FOUND);
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error"
        });
    }
});
exports.authMiddleware = authMiddleware;
