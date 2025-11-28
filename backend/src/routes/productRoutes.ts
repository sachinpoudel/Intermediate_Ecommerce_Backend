
import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { createProduct, deleteProduct, getProductById, listProduct, searchProducts, updateProduct } from "../controllers/productController";
import { authMiddleware } from "../middlwares/authMiddleware";
import { adminMiddleware } from "../middlwares/adminMiddleware";

const productRoutes:Router = Router()

productRoutes.post("/create", [authMiddleware, adminMiddleware],errorHandler(createProduct))
productRoutes.delete("/delete/:id", [authMiddleware, adminMiddleware],errorHandler(deleteProduct))
productRoutes.put("/update/:id", [authMiddleware, adminMiddleware],errorHandler(updateProduct))
productRoutes.post("/get", [authMiddleware, adminMiddleware],errorHandler(listProduct))
productRoutes.post("/get/:id", [authMiddleware, adminMiddleware],errorHandler(getProductById))
productRoutes.get("/search", [authMiddleware,], errorHandler(searchProducts))
export default productRoutes