import { Router } from "express";
import { authMiddleware } from "../middlwares/authMiddleware";
import { adminMiddleware } from "../middlwares/adminMiddleware";
import { errorHandler } from "../errorHandler";
import { changeUserRole, getUserById, listUsers } from "../controllers/userController";
import { listAddress } from "../controllers/addController";

const userRoutes:Router = Router()

userRoutes.put('/role', [authMiddleware,adminMiddleware], errorHandler(changeUserRole))


userRoutes.get('/role', [authMiddleware,adminMiddleware], errorHandler(listUsers))

userRoutes.get('/role', [authMiddleware,adminMiddleware], errorHandler(getUserById))