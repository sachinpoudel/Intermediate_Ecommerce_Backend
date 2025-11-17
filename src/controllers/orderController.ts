
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
                id: req.user.defaultShippingAddress
            }
         })
         const order = await tx.order.create({
            data:{
                userId: req.user.id,
                netAmount: price,
                address: address?.formatedAddress || "No address found",
                // orderProducts: {
                //     create: cartItems.map((cart) => {
                //         return {
                //             productId: cart.productId,
                //             quantity: cart.quantity,
                //         }
                //     })
                // }
            }
         })
    })

}
 export const listOrder = async (req:Request, res:Response) => {}
export const cancelOrder = async (req:Request, res:Response) => {}
export const getOrderById = async (req:Request, res:Response) => {}     