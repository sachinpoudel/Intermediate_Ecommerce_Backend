"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
});
exports.addressSchema = zod_1.z.object({
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    country: zod_1.z.string()
});
