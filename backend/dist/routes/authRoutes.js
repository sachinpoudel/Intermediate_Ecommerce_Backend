"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const errorHandler_1 = require("../errorHandler");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, errorHandler_1.errorHandler)(authController_1.signUp));
authRoutes.post("/login", (0, errorHandler_1.errorHandler)(authController_1.logIn));
exports.default = authRoutes;
