import { NextFunction, Request, Response } from "express";
import { unAuthorized } from "../exceptions/unAuthorized";
import { ErrorCode } from "../exceptions/root";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { prisma } from "..";
import { notFound } from "../exceptions/notfound";

export const authMiddleware = async (req:Request, res:Response,next:NextFunction) => {
try {
    const token = req.cookies.token;
    if(!token){
        throw new unAuthorized("Unauthorized access", ErrorCode.UNAUTHORIZED);
    }
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const user = await prisma.user.findFirst({
        where:{
id: decoded.userId
        }
    })
    if(!user){
        throw new notFound("User not found", ErrorCode.USER_NOT_FOUND);
    }
    (req as any).user = user;
    next();
} catch (error) {
    res.status(500).json({
        message: "internal server error"
    })
}
}