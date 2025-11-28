
import { Router } from "express"
import { createOrder, listOrder, cancelOrder, getOrderById , listAllOrders, listUsersOrders, changeStatus} from "../controllers/orderController"
import { errorHandler } from "../errorHandler"
import { authMiddleware } from "../middlwares/authMiddleware"
import { adminMiddleware } from "../middlwares/adminMiddleware"



const orderRoutes:Router = Router()

orderRoutes.post("/", [authMiddleware],errorHandler(createOrder))
orderRoutes.get("/", [authMiddleware], errorHandler(listOrder))
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById))
orderRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder))


orderRoutes.get("/index", [authMiddleware,adminMiddleware], errorHandler(listAllOrders))

orderRoutes.get("/users/:id", [authMiddleware,adminMiddleware], errorHandler(listUsersOrders))

orderRoutes.put("/index", [authMiddleware,adminMiddleware], errorHandler(changeStatus))

export default orderRoutes