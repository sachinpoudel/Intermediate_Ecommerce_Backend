
import { Request, Response } from 'express';
import { prisma } from '../index';
import { notFound } from '../exceptions/notfound';
import { ErrorCode } from '../exceptions/root';

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
         const orderEvent = await tx.orderEvents.create({
            data:{
                orderId: order.id,
            }
         })
         await tx.cart.deleteMany({
            where:{
                userId: req.user.id
            }
         })
         return res.status(201).json({ order, orderEvent }) 
    })

}
 export const listOrder = async (req:Request, res:Response) => {

const orders = await prisma.order.findMany({
    where:{
        userId: req.user.id
    }
})

res.json(orders)

 }
export const cancelOrder = async (req:Request, res:Response) => {
    try {
    const order = await prisma.order.update({
        where: {
            id: +req.params.id,
        },
        data: {
            status: "CANCELLED"
        },
    })
    await prisma.orderEvents.create({
        data:{
            orderId: order.id,
            status: "CANCELLED"
        }
    })
    res.json(order)
} catch (error) {
    throw new notFound("Order not found", ErrorCode.NOT_FOUND)
}
}
export const getOrderById = async (req:Request, res:Response) => {

try {
    const order = await prisma.order.findFirstOrThrow({
        where: {
            id: +req.params.id,
        },
        include: {
            orderProducts: true,
            // events: true
        }
    })
    res.json(order)
} catch (error) {
    throw new notFound("Order not found", ErrorCode.NOT_FOUND)
}

}     



export const listAllOrders = async (req:Request, res:Response) => {
    let whereClause = {}
    const status = req.params.status

    if(status){
whereClause = {
    status
}
const orders = await prisma.order.findMany({
    where: whereClause,
    skip: req.query.skip ? +req.query.skip : 0,
})
res.json(orders)
    }
}

export const changeStatus = async (req:Request, res:Response) => {
    try {
        const order = await prisma.order.update({
            where: {
                id: +req.params.index
            },
            data: {
                status : req.body.status
            }
        })
      res.json(order)
    
      await prisma.orderEvents.create({
        data:{
            orderId: order.id,
            status: req.body.status
        }
    })
    } catch (error) {
        throw new notFound("Order not found", ErrorCode.NOT_FOUND)
    }
}

export const listUsersOrders = async (req:Request, res:Response) => {

     let whereClause = {}
    const status = req.params.id

    if(status){
whereClause = {
    ...whereClause,
    status
}
const orders = await prisma.order.findMany({
    where: whereClause,
    skip: req.query.skip ? +req.query.skip : 0,
})
res.json(orders)
    }
}