
import { Router } from "express";
import { logIn, signUp } from "../controllers/authController";
import { errorHandler } from "../errorHandler";

const authRoutes:Router = Router()

authRoutes.post("/signup", errorHandler(signUp))
authRoutes.post("/login", errorHandler(logIn))

export default authRoutes