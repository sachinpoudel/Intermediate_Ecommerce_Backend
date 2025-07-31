import { Request, Response } from "express";
import { badRequest } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/root";
import { prisma } from "..";
import { success } from "zod";
import { addressSchema } from "../validations/userSchema";

export const addAddress = async(req:Request,res:Response) =>{
    const address = addressSchema.parse(req.body)
   
if(!address){
    throw new badRequest("couldnt get address data", ErrorCode.BAD_REQUEST)
}
const addAddress = await prisma.address.create({
data:{
    ...address ,
    userId: (req as any).user.id
}
})
res.status(201).json({
    message: "successfully got the address",
    success: true,
    addAddress
})
}
export const deleteAddress = async(req:Request,res:Response) =>{
    const address = req.params.id 
    if(!address){
        throw new badRequest("couldnt get address data", ErrorCode.BAD_REQUEST)
    } 
    const deleteAdd = await prisma.address.delete({
        where:{
            id: address.toString()
        }
    })
    res.status(201).json({
        message: "successfully deleted the address",
        success: true,
        deleteAdd
    })
    
}
export const updateAddress = async(req:Request,res:Response) =>{
    const address = req.params.id;
    if(!address){
        throw new badRequest("couldnt get address data", ErrorCode.BAD_REQUEST)
    }
    const updatedAddress = await prisma.address.update({
       where:{
        id: address.toString()
       },
       data:{
        ...req.body
       }
    })
    res.status(201).json({
        message: "successfully updated the address",
        success: true,
        updatedAddress
    })

}
export const listAddress = async(req:Request,res:Response) =>{
   


    const listAddress = await prisma.address.findMany({
        where:{
            userId: (req as any).user.id
        }
    })
    res.status(201).json({
        message: "successfully listed the address",
        success: true,
        listAddress
    })

}