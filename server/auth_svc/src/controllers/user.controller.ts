import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { genaccesstoken, genrefreshtoken } from "../utils/jwt-helper";


const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = await req.body;
    if (!username || !password || !email) {
      res.status(401).json({ message: "Invalid Request" });
    }

    // check user already exists
    const user_exists = await User.findOne({ email });
    if (user_exists) {
      res
        .status(200)
        .json({ message: "User already exists with following credentials!" });
    }
    // create new user with the following cred'
    const new_user = await User.create({ username, password, email });
    if (new_user) {
      const token_payload = { id: new_user._id, username: new_user.username };
      const accessToken = genaccesstoken(token_payload);
      genrefreshtoken(res, token_payload);
      res.status(201).json({
        message: "User created successsfully!",
        "access-token": accessToken,
      });
    } else res.status(500).json({ message: "Internal Server Error!" });
  } catch (e) {
    logging.error("Something went wrong in register controller.");
  }
};
const login = () => {};
const logout = () => {};
const update_user = () => {};
const delete_user = () => {};

export { register };
