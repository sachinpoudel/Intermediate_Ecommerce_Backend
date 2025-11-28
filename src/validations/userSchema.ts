import {z} from "zod";

export const signupSchema = z.object({
    name :z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
})


export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

export const addressSchema = z.object({
    lineOne: z.string().min(5),
    lineTwo: z.string().optional(),
    pinCode: z.string().min(4).max(10),
    city: z.string(),
    state: z.string(),
    country: z.string(),
})

export const updateUserSchema = z.object({
    name:z.string().min(3).max(50).optional(),
    defaultBillingAddress: z.number().optional(),
    defaultShippingAddress: z.number().optional(),  
})