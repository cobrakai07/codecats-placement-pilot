import { Router } from "express";
import { register } from "../controllers/user.controller";

const appRouter = Router();

appRouter.post("/register", register);

export default appRouter;
