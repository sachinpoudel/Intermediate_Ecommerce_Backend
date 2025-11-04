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
exports.logIn = exports.signUp = void 0;
const userSchema_1 = require("../validations/userSchema");
const __1 = require("..");
const badRequest_1 = require("../exceptions/badRequest");
const root_1 = require("../exceptions/root");
const bcrypt_1 = __importDefault(require("bcrypt"));
const secret_1 = require("../secret");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = userSchema_1.signupSchema.parse(req.body);
    const { name, email, password } = validatedData;
    const user = yield __1.prisma.user.findFirst({
        where: { email },
    });
    if (user) {
        throw new badRequest_1.badRequest("User already exits", root_1.ErrorCode.USER_ALREADY_EXISTS);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield __1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    res.status(201).json({
        message: "user created successfully",
        newUser,
    });
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = userSchema_1.loginSchema.parse(req.body);
    const { email, password } = validatedData;
    const user = yield __1.prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!user) {
        throw new badRequest_1.badRequest("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new badRequest_1.badRequest("Invalid credentials", root_1.ErrorCode.INVALID_CREDENTIALS);
    }
    if (!secret_1.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret_1.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: "strict", // Adjust as needed
    });
    res.status(201).json({
        message: "User logged in successfully",
        user
    });
});
exports.logIn = logIn;
