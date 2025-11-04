
import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middlwares/authMiddleware";
import { adminMiddleware } from "../middlwares/adminMiddleware";
import { addAddress, deleteAddress, listAddress ,updateAddress } from "../controllers/addController";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cartController";

const cartRoutes:Router = Router()

cartRoutes.post("/addItem", [authMiddleware],errorHandler(addItemToCart))
cartRoutes.delete("/delete/:id", [authMiddleware],errorHandler(deleteItemFromCart))
cartRoutes.put("/update/:id", [authMiddleware],errorHandler(changeQuantity))
cartRoutes.get("/get", [authMiddleware],errorHandler(getCart))

export default cartRoutes