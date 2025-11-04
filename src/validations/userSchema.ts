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
    city: z.string(),
    state: z.string(),
    country: z.string()

})