import { Request, Response, NextFunction } from "express";
// models and helpers
import { IRequest } from "../utils/interface.helper";
import Submission from "../models/submission.model";
import Tests from "../models/test.model";
import Question from "../models/question.model";
import Option from "../models/option.model";

// 1. get all the submission (/submission/get-all)
// accessble by admin's only
// 2. get all the submission by quiz (/submission/test/:id)
// accessble by test creator only
// 3. get all the submission by user (/submission /user/)
// accessble by request user only
// 4. get submission by quiz and user (/submission/test/user/:id)
// accessble by user / tutor only
// 5. submit route (/test/submit)
// accessble by user only

export const getAllSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.sendStatus(500);
    logging.error("");
  }
};

export const getAllSubmissionByTestId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testId = req.params.id;
    if (!testId) {
      return res.sendStatus(400);
    }
    const submissions = await Submission.find({ testId });
    if (submissions) {
      return res.status(200).json(submissions);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    logging.error("");
  }
};

export const getAllSubmissionByUserId = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const submissions = await Submission.find({ userId });
    if (submissions) {
      return res.status(200).json(submissions);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    logging.error("");
  }
};

export const getAllSubmissionByTestAndUserId = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const testId = req.params.id;
    if (!testId) {
      return res.sendStatus(400);
    }
    const submission = await Submission.findOne({ userId, testId });
    if (submission) {
      return res.status(200).json(submission);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    logging.error("");
  }
};

export const submitTest = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const { testId, answers } = await req.body;
    if (!testId || !answers) {
      return res.sendStatus(400);
    }
    const test = await Tests.findById(testId).populate({
      path: "questions",
      model: "Question",
      populate: {
        path: "options",
        model: "Option",
      },
    });
    if (!test) {
      return res.sendStatus(404);
    }
    const alreadySubmitted = await Submission.find({ testId, userId });
    if (alreadySubmitted) {
      return res.sendStatus(403);
    }
    // variable with zero
    let total_score = 0;

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (!question) continue;
      let isCorrect = false;
      const correctOption = await Option.findOne({
        questionId: question._id,
        isCorrect: true,
      });
      isCorrect = correctOption?._id!.toString() === answer.selectedOptionId;
      if (isCorrect) total_score++;
    }

    const questionLength = test?.questions.length;
    // calculate the total percentage of the user.
    const score = (total_score / questionLength!) * 100;
    logging.info(test?._id, score, userId);
    const userResponse = new Submission({
      testId: test?._id,
      userId: userId,
      score: score,
    });
    await userResponse.save();

    if (!userResponse) {
      return res.sendStatus(400);
    }
    res.status(200).json(userResponse);
  } catch (error) {
    res.sendStatus(500);
    logging.error(error);
  }
};
