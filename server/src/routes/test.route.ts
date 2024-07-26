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
import isAuthorized from "../middleware/isauthorized.middleware";

const testRouter = Router();

/**
 * @swagger
 * /api/v1/tests/all:
 *   get:
 *     summary: Get all tests
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 *       500:
 *         description: Server error
 */

testRouter.get("/all", getAllTests);
/**
 * @swagger
 * /api/v1/tests/creator:
 *   get:
 *     summary: Get tests by creator ID
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 *       404:
 *         description: No tests found
 *       500:
 *         description: Server error
 */

testRouter.get("/user", isAuthenticated, isAuthorized, getTestsByCreatorId);

/**
 * @swagger
 * /api/v1/tests/create:
 *   post:
 *     summary: Create a new test
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Test created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
testRouter.post("/create", isAuthenticated, isAuthorized, createTest);
/**
 * @swagger
 * /api/v1/tests/{id}:
 *   get:
 *     summary: Get a test by ID
 *     tags: [Tests]
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
 *         description: Successfully retrieved the test
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Test not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/tests/delete/{id}:
 *   delete:
 *     summary: Delete a test
 *     tags: [Tests]
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
 *         description: Test deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Test not found
 *       500:
 *         description: Server error
 */

testRouter
  .route("/test/:id")
  .get(isAuthenticated, getTestById)
  .delete(isAuthenticated, isAuthorized, deleteTest)
  .patch(isAuthenticated, isAuthorized, updateTest);

/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         creator:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *     Question:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         testId:
 *           type: string
 *         questionText:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Option'
 *     Option:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         questionId:
 *           type: string
 *         optionText:
 *           type: string
 *         isCorrect:
 *           type: boolean
 */

export default testRouter;
