
import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middlwares/authMiddleware";
import { adminMiddleware } from "../middlwares/adminMiddleware";
import { addAddress, deleteAddress, listAddress ,updateAddress } from "../controllers/addController";

const addRoutes:Router = Router()

addRoutes.post("/add", [authMiddleware],errorHandler(addAddress))
addRoutes.delete("/delete/:id", [authMiddleware],errorHandler(deleteAddress))
addRoutes.put("/update/:id", [authMiddleware],errorHandler(updateAddress))
addRoutes.get("/get", [authMiddleware],errorHandler(listAddress))

export default addRoutes