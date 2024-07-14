import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { SECRET_KEY } from "../config/config";
import { getUserById } from "../utils/user.helper";
import { IRequest, UserInterface } from "../utils/interface.helper";

const isAuthenticated = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = await req.cookies.session_cookie;
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      req.user = (await getUserById(decoded.id)) as UserInterface | any;
      next();
    } catch (error) {
      logging.error("Authentication Middleware: " + error);
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

export default isAuthenticated;
