import { success } from "zod";
import { httpException } from "../exceptions/root";
import express, {Request,Response, NextFunction} from 'express'

export const errorMiddleware = async(err:httpException , req:Request,res:Response, next:NextFunction) => {
if(err  instanceof httpException){
    return res.status(err.statusCode).json({
        message: err.message || "Internal Server Error",
        success: false,
        errorCode: err.errorCode || "Unknown Error",
        errors: err.errors || []
    })
}
}