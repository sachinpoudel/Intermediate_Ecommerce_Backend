import { Request, Response, NextFunction } from "express";
import { ErrorCode, httpException } from "./exceptions/root";
import { ZodError } from "zod";
import { badRequest } from "./exceptions/badRequest";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: httpException;

      if (error instanceof httpException) {
        exception = error;
      } else if (error instanceof ZodError) {
        exception = new badRequest(
          "Unprocessable entity",
          ErrorCode.UNPROCESSABLE_ENTITY
        );
        (exception as any).errors = error;
      } else {
        exception = new httpException(
          "Something went wrong",
          ErrorCode.INTERNAL_SERVER_ERROR,
          500,
          null
        );
      }

      next(exception);
    }
  };
};
