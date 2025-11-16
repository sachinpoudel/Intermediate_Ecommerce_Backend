import { NextFunction,Request,Response } from "express";
import { unAuthorized } from "../exceptions/unAuthorized";
import { ErrorCode } from "../exceptions/root";

export const adminMiddleware = (req : Request, res:Response, next:NextFunction) => {
    const user = (req as any).user;
    if(user && user.ROLE === 'ADMIN'){
        next();
    } else {
        throw new unAuthorized("Unauthorized access", ErrorCode.UNAUTHORIZED);
    }
}