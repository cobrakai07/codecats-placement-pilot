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

/**
 * @swagger
 * /api/v1/submission/get-all:
 *   get:
 *     summary: Get all submissions
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 *       500:
 *         description: Server error
 */
submissionRouter.get("/get-all", getAllSubmission);
/**
 * @swagger
 * /api/v1/submission/user:
 *   get:
 *     summary: Get all submissions for the current user
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 *       404:
 *         description: No submissions found
 *       500:
 *         description: Server error
 */
submissionRouter.get("/user", isAuthenticated, getAllSubmissionByUserId);

/**
 * @swagger
 * /api/v1/submission/test/{id}:
 *   get:
 *     summary: Get all submissions for a specific test
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved submissions for the test
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Bad request
 *       404:
 *         description: No submissions found
 *       500:
 *         description: Server error
 */
submissionRouter.get("/test/:id", isAuthenticated, getAllSubmissionByTestId);
/**
 * @swagger
 * /api/v1/submission/test/user/{id}:
 *   get:
 *     summary: Get submission for a specific test and the current user
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the submission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Submission not found
 *       500:
 *         description: Server error
 */
submissionRouter.get(
  "/test/user/:id",
  isAuthenticated,
  getAllSubmissionByTestAndUserId
);
/**
 * @swagger
 * /api/v1/test/submit:
 *   post:
 *     summary: Submit a test
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - testId
 *               - answers
 *             properties:
 *               testId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     selectedOptionId:
 *                       type: string
 *     responses:
 *       200:
 *         description: Test submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Bad request
 *       403:
 *         description: Test already submitted
 *       404:
 *         description: Test not found
 *       500:
 *         description: Server error
 */
submissionRouter.post("/submit", isAuthenticated, submitTest);

/**
 * @swagger
 * components:
 *   schemas:
 *     Submission:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         testId:
 *           type: string
 *         userId:
 *           type: string
 *         score:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default submissionRouter;
