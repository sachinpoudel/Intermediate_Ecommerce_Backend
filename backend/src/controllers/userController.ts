import { Request, Response } from "express";
import { prisma } from "..";
import { notFound } from "../exceptions/notfound";
import { ErrorCode } from "../exceptions/root";
export const changeUserRole = async (req: Request, res: Response) => {

  try {
    // validation can be added here for role values
        const user = await prisma.user.update({
            where: {
                id: req.query.id as string
            },
            data: {
                role: req.body.role
            }
          
        })
        res.json({user})
    } catch (error) {
        throw new notFound("User not found", ErrorCode.NOT_FOUND)
    }




}



export const listUsers = async (req: Request, res: Response ) => {
    const users = await prisma.user.findMany({
        skip: req.query.skip ? +req.query.skip : 0,
        take: 10
    });
    res.json({
        users
    })
}

export const getUserById = async (req: Request, res: Response) => {

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: req.query.id as string
            },
            include:{
                addresses: true
            }
        })
        res.json({user})
    } catch (error) {
        throw new notFound("User not found", ErrorCode.NOT_FOUND)
    }
}    