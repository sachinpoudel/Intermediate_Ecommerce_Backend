
import { Router } from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import addRoutes from "./addRoutes";

const rootRouter:Router = Router()

rootRouter.use("/auth" ,authRoutes )
rootRouter.use("/auth" ,productRoutes )
rootRouter.use("/auth" ,addRoutes )

export default rootRouter