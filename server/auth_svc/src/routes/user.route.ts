import { Router } from "express";
import {
  login,
  logout,
  register,
  profile,
  update_user,
  delete_user,
} from "../controllers/user.controller";
import isAuthenticated from "../middleware/isauthenticated.middleware";

const userRouter = Router();

// @ public routes
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Log in successfull (In the response a cookie is set to the request and message will be returned)
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Invalid credentails
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Invalid credentails
 *       401:
 *         description: Invalid Credentials
 */
userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/logout", logout);
// @ private routes
userRouter.get("/profile", isAuthenticated, profile);
userRouter.patch("/update", isAuthenticated, update_user);
userRouter.delete("/delete", isAuthenticated, delete_user);

export default userRouter;
