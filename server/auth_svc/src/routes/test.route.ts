import { Router } from "express";

import isAuthenticated from "../middleware/isauthenticated.middleware";
import {
  createTest,
  deleteTest,
  getAllTests,
  getTestById,
  getTestsByCreatorId,
  updateTest,
} from "../controllers/test.controller";

const testRouter = Router();

testRouter.get("/all", getAllTests);
testRouter.get("/user", isAuthenticated, getTestsByCreatorId);
testRouter.post("/create", isAuthenticated, createTest);
testRouter
  .route("/test/:id")
  .get(isAuthenticated, getTestById)
  .delete(isAuthenticated, deleteTest)
  .patch(isAuthenticated, updateTest);

export default testRouter;
