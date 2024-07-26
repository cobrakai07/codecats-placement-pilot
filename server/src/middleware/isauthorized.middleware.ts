import { Response, NextFunction } from "express";
import { IRequest } from "../utils/interface.helper";

const isAuthorized = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = await req.cookies.session_cookie;
  if (token) {
    try {
      const userRole = req?.user?.role;
      if (userRole?.toLowerCase() === "tutor") {
        next();
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      logging.error("Authorization Middleware: " + error);
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

export default isAuthorized;
