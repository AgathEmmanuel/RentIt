import { Request, Response, NextFunction } from "express";
import { NotLoggedInError } from "../error/not-loggedin-error";

export const loggedoffUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
      throw new NotLoggedInError();
  }
  next();
};
