import { Request, Response } from "express";
import { ErrorCode } from "../exceptions/root";
import { badRequest } from "../exceptions/badRequest";
import { prisma } from "..";
import { success } from "zod";
import { _isoDateTime } from "zod/v4/core/api.cjs";

export const addItemToCart = async (req:Request, res:Response) => {
   const item = req.body;
   if(!item){
    throw new badRequest("couldn't get item data", ErrorCode.BAD_REQUEST);
   }
   const newItem = await prisma.cart.create({
    data:{
...item,
userId: (req as any).user.id
    }
   })
   res.status(201).json({
    message: "item added successfully", success: true, newItem
   })
}
export const deleteItemFromCart = async (req:Request, res:Response) => {
const itemId =req.params.id 
if(!itemId){
    throw new badRequest("couldn't get item data", ErrorCode.BAD_REQUEST);
   }
const deleteItem = await prisma.cart.delete({
    where:{
        id: itemId
    }
})
res.status(201).json({
    message: "item deleted successfully", success: true, deleteItem
   })
}
export const changeQuantity = async (req:Request, res:Response) => {
    const itemId =req.params.id 
    const {quantity} = req.body

    
    if(!itemId || !quantity){
        throw new badRequest("couldn't get item data", ErrorCode.BAD_REQUEST);
       }

       const parsedQuantity = parseInt(quantity)

       if(isNaN(parsedQuantity) || parsedQuantity<1){
        throw new badRequest("invalid quantity value", ErrorCode.BAD_REQUEST);

       } 

       const changedQuantity = await prisma.cart.update({
        where: {
            id: itemId
        },
        data: {
           quantity: parsedQuantity

        }
       })
       res.status(201).json({
        message: "item updated successfully", success: true, changedQuantity
       })
    
}
export const getCart = async (req:Request, res:Response) => {
    const getcart = (req as any).user.id

    if(!getcart){
        throw new badRequest("couldnot get id", ErrorCode.BAD_REQUEST);

    }
    const getCart = await prisma.cart.findMany({
        where:{
            userId: getcart,
        },
        include:{
            product: true
        }
    })
    res.status(201).json({
        message: "item updated successfully", success: true, getCart
       })
}