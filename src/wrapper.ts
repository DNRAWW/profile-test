import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export function promiseWrapper(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((err: unknown) => {
      if (err instanceof ZodError) {
        return res.status(400).send(fromZodError(err));
      }
      console.error(err);
      return res.status(500).send("Internal server error");
    });
  };
}
