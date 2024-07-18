import { Router } from "express";

import isAuthenticated from "../middleware/isauthenticated.middleware";
import {
  getAllSubmission,
  getAllSubmissionByTestAndUserId,
  getAllSubmissionByTestId,
  getAllSubmissionByUserId,
  submitTest,
} from "../controllers/submit.controller";

const submissionRouter = Router();

submissionRouter.get("/all", getAllSubmission);
submissionRouter.get("/user", isAuthenticated, getAllSubmissionByUserId);
submissionRouter.get("/test/:id", isAuthenticated, getAllSubmissionByTestId);
submissionRouter.get(
  "/user/test/:id",
  isAuthenticated,
  getAllSubmissionByTestAndUserId
);
submissionRouter.post("/submit", isAuthenticated, submitTest);

export default submissionRouter;
