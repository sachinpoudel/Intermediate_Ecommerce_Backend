
import { Request, Response } from 'express';
import { prisma } from '../index';

export const createOrder = async (req:Request, res:Response) => {


    //create a transation

    return await prisma.$transaction(async(tx) => {
         const cartItems = await tx.cart.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
         })
         if(cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" })
         }
         const price = cartItems.reduce((prev,curr) => {
            return prev + (curr.quantity * +curr.product.price)
         },0);
         const address = await tx.address.findFirst({
            where: {
                id: req.user.defaultShippingAddressId
            }
         })
    })

}
 export const listOrder = async (req:Request, res:Response) => {}
export const cancelOrder = async (req:Request, res:Response) => {}
export const getOrderById = async (req:Request, res:Response) => {}     