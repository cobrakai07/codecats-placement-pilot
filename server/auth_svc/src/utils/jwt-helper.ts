import jwt from "jsonwebtoken";
import { Response } from "express";
import { SECRET_KEY } from "../config/config";

export const genaccesstoken = (payload: object) => {
  const accessToken = jwt.sign({ payload }, SECRET_KEY.ACCESS_KEY, {expiresIn: "5m",});
  return accessToken;
};

export const genrefreshtoken = (res: Response, payload: object) => {
  const token = jwt.sign({ payload }, SECRET_KEY.REFRESH_KEY, {expiresIn: "7d",});

  res.cookie("session-cookie", token, {
    httpOnly: true, // accessable only by http request.
    sameSite: "strict", // prevent csrf
    maxAge: 7 * 24 * 60 * 60 * 1000, //seven days in miliseconds
  });
};

//export const validatetoken = () => {};
//export const decodejwttoken = () => {};
