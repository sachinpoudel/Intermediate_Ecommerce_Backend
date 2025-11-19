import { Request, Response } from "express";
import { prisma } from "..";
import { notFound } from "../exceptions/notfound";
import { ErrorCode } from "../exceptions/root";
import { badRequest } from "../exceptions/badRequest";

export const createProduct = async(req : Request, res: Response) => {
    const product = req.body
    if(!product){
        throw new badRequest("details not received" , ErrorCode.NOT_FOUND)
    }

    const productCreate = await prisma.product.create({
        data:{
            ...product,
            tags: product.tags.join(",")
        }
    })
   
    res.status(200).json(productCreate)
}
export const deleteProduct = async(req : Request, res: Response) => {
    const productId = req.params.id 

    if(!productId){
        throw new badRequest("id didnt received", ErrorCode.BAD_REQUEST)
    }
    const deleteProducted = await prisma.product.delete({
        where:{
            id: productId.toString()
        }
    })
   
    res.status(201).json({
        message: "product delete successfully",
        success: true,
        deleteProducted
    })
}
export const updateProduct = async(req : Request, res: Response) => {
    const product = req.body
    if(!product){
        throw new badRequest("failed to received details" , ErrorCode.BAD_REQUEST)
    }
    if(product.tags){
        product.tags = product.tags.join(",") 
    }
    const updateProduct = await prisma.product.update({
        where: {
            id: req.params.id
        },
        data: {
            ...product
        }
    })
    res.json({message: "updated successfully" , success: true, updateProduct})
}
export const listProduct = async(req : Request, res: Response) => {
    const count = await prisma.product.count()
    const listingProduct = req.query.skip
    const listProduct = await prisma.product.findMany({
        skip: listingProduct ? parseInt(listingProduct.toString(), 10) : 0,
        take: 10
        
    })
    res.status(200).json({
        message: "product listed successfully",
        success: true,
        count,
        listProduct
    })
}
export const getProductById = async(req : Request, res: Response) => {
    const productId = req.params.id
    if(!productId){
        throw new badRequest("id not received", ErrorCode.BAD_REQUEST)
    }
    const product = await prisma.product.findUnique({
        where: {
            id: productId.toString()
        }
    })
    res.status(200).json({
        message: "product found successfully",
        success: true,
        product
    })
}

export const searchProducts = async (req: Request, res: Response) => {}