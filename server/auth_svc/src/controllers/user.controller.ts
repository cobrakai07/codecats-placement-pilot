import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { settoken } from "../utils/jwt-helper";
import {
  checkUserCredentials,
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
} from "../utils/user.helper";
import { IRequest } from "../utils/interface.helper";

// public route
// POST @ /api/v1/user/reigster
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = await req.body;
    if (!username || !password || !email) {
      res.sendStatus(400);
    }

    const user_exists = await getUserByEmail(email);
    if (user_exists) {
      res.status(200).json("User already exists");
    }

    const new_user = await createUser(email, username, password);
    if (new_user) {
      const token_payload = { id: new_user._id };
      settoken(res, token_payload);
      res.sendStatus(201);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    res.sendStatus(500);
    logging.error("Something went wrong in register controller.", e);
  }
};

// public route
// POST @ /api/v1/user/login
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password) {
      res.sendStatus(400);
    }

    if (await checkUserCredentials(email, password)) {
      const user = await getUserByEmail(email);
      const token_payload = { id: user?._id };
      settoken(res, token_payload);
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    logging.error("Something went wrong in login controller.");
  }
};

// public route
// POST @ /api/v1/user/logout
const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("session_cookie", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json("Logged out successfully");
  } catch (e) {
    logging.error("Something went wrong in logout controller.");
  }
};

// private route
// GET @ /api/v1/user/profile
const profile = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(req?.user?._id);
    if (user) {
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    logging.error("Something went wrong in profile controller.");
  }
};

// private route
// PATCH @ /api/v1/user/update
const update_user = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      });
    } else {
      res.sendStatus(404);
      throw new Error("User not found");
    }
  } catch (e) {
    logging.error("Something went wrong in update_user controller.");
  }
};

// private route
// DELETE @ /api/v1/user/delete
const delete_user = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await deleteUser(req.user?._id);
    if (user) {
      res.cookie("session_cookie", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json("user delete successfully");
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    logging.error("Something went wrong in delete_user controller.");
  }
};

export { register, login, logout, profile, update_user, delete_user };
