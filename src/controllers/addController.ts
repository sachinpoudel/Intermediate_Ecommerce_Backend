import { Request, Response } from "express";
import { badRequest } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/root";
import { prisma } from "..";
import { success } from "zod";
import { addressSchema, updateUserSchema } from "../validations/userSchema";
import { Address, User } from "../../generated/prisma";
import { notFound } from "../exceptions/notfound";

export const addAddress = async(req:Request,res:Response) =>{
     addressSchema.parse(req.body)
  const address = await prisma.address.create({
    data:{
        ...req.body,
        userId: req.user.id
}
  })
  res.json(address)
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
   const validatedData = updateUserSchema.partial().parse(req.body)
   let shippingAddress : Address
   let billingAddress: Address;

   if(validatedData.defaultShippingAddress){
    try {
        shippingAddress = await prisma.address.findFirstOrThrow({
            where: {
                id: validatedData.defaultShippingAddress.toString(),
            }
        })
    } catch (error) {
        throw new notFound("Shipping address not found", ErrorCode.NOT_FOUND)
    }
    if(shippingAddress.userId !== req.user.id){
        throw new notFound("Shipping address not found", ErrorCode.NOT_FOUND)
    }
}
  if(validatedData.defaultBillingAddress){
    try {
        billingAddress = await prisma.address.findFirstOrThrow({
            where: {
                id: validatedData.defaultBillingAddress.toString(),
            }
        })
       
    } catch (error) {
        throw new notFound("Billing address not found", ErrorCode.NOT_FOUND)
    }
     if(billingAddress.userId !== req.user.id){
            throw new notFound("Billing address not found", ErrorCode.NOT_FOUND)
        }
   }
   const updatedUser = await prisma.user.update({
    where: {
        id: req.user.id
    },data:{
        ...validatedData,
    }
   })

}
export const listAddress = async(req:Request,res:Response) =>{
   
const userId = req.user.id;

    const listAddress = await prisma.address.findMany({
        where:{
            userId: userId
        }
    })
    res.status(201).json({
        message: "successfully listed the address",
        success: true,
        listAddress
    })

}