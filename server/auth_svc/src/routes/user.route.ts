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

const appRouter = Router();
// @ public routes
appRouter.post("/login", login);
appRouter.post("/register", register);
appRouter.post("/logout", logout);
// @ private routes
appRouter.get("/profile", isAuthenticated, profile);
appRouter.patch("/update", isAuthenticated, update_user);
appRouter.delete("/delete", isAuthenticated, delete_user);

export default appRouter;
