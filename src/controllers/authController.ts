import express, { NextFunction, Request, Response } from "express";
import { loginSchema, signupSchema } from "../validations/userSchema";
import { prisma } from "..";
import { badRequest } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/root";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../secret";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const signUp = async (req: Request, res: Response, next:NextFunction) => {
  const validatedData = signupSchema.parse(req.body);

  const { name, email, password } = validatedData

  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (user) {
    throw new badRequest("User already exits", ErrorCode.USER_ALREADY_EXISTS);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password:hashedPassword,
    },
  });
  res.status(201).json({
    message: "user created successfully",
    newUser,
  });
};

export const logIn = async(req:Request, res:Response) => {
  const validatedData = loginSchema.parse(req.body)
  const { email, password } = validatedData;

  const user = await prisma.user.findFirst({
    where:{
      email
    }
  })
  if(!user){
    throw new badRequest("User not found", ErrorCode.USER_NOT_FOUND);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    throw new badRequest("Invalid credentials", ErrorCode.INVALID_CREDENTIALS); 
  }

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: "strict", // Adjust as needed
  })
  res.status(201).json({
      message: "User logged in successfully",
      user
  })
}