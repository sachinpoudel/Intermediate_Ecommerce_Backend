
import { Router } from "express"
import { createOrder, listOrder, cancelOrder, getOrderById } from "../controllers/orderController"
import { errorHandler } from "../errorHandler"
import { authMiddleware } from "../middlwares/authMiddleware"



const orderRoutes:Router = Router()

orderRoutes.post("/", [authMiddleware],errorHandler(createOrder))
orderRoutes.get("/", [authMiddleware], errorHandler(listOrder))
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById))
orderRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder))

export default orderRoutes