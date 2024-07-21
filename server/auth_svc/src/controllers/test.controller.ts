import { Request, Response, NextFunction } from "express";
// models and helpers
import Tests from "../models/test.model";
import Question from "../models/question.model";
import Option from "../models/option.model";
import { IRequest } from "../utils/interface.helper";

// private route
// @ GET /api/v1/tests/all
// admin
export const getAllTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tests = await Tests.find();
    res.status(200).json(tests);
  } catch (error) {
    res.sendStatus(500);
    logging.error("");
  }
};

// private route
// @ GET /api/v1/tests/:id
// admin, creator
export const getTestById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testId = req.params.id;
    if (!testId) {
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
    if (test) {
      return res.status(200).json(test);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    logging.error("Test by Id controller error", error);
  }
};

// private route
// @ GET /api/v1/tests/creator
// admin, creator
export const getTestsByCreatorId = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user?._id;
    const tests = await Tests.find({ creator: user?.toString() }).populate({
      path: "questions",
      model: "Question",
      populate: {
        path: "options",
        model: "Option",
      },
    });
    if (tests) {
      return res.status(200).json(tests);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    logging.error("Tests by creator Id controller error", error);
  }
};

// private route
// @ POST /api/v1/tests/create
// admin, creator
export const createTest = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const creator = req.user?._id;
    const { title, description, questions } = await req.body;
    if (!title || !description || !questions) {
      return res.sendStatus(400);
    }
    const test = new Tests({ creator, title, description });
    // saving to get the db id
    await test.save();

    // save questions and options in db.
    const saveQuestions = await Promise.all(
      // first loop over the questions
      questions.map(async (ques: any) => {
        // create a new db object for question
        // this promise will return us an array of question id's
        const question = new Question({
          testId: test._id,
          questionText: ques.questionText,
        });
        // saving to get the db id
        await question.save();
        // check if options are there
        if (ques.options) {
          // now loop over the options in the request
          // this promise will return us an array of option id's
          const options = await Promise.all(
            ques.options.map(async (opt: any) => {
              const option = new Option({
                questionId: question?._id,
                optionText: opt.optionText,
                isCorrect: opt.isCorrect,
              });
              await option.save();
              return option?._id;
            })
          );
          question.options = options;
          await question.save();
        }
        return question?._id;
      })
    );

    test.questions = saveQuestions;
    await test.save();
    if (test) {
      return res.status(201).json(test);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    res.sendStatus(500);
    logging.error("Create Test controller error", error);
  }
};

// private route
// @ PATCH /api/v1/tests/update/:id
// admin, creator
export const updateTest = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const creator = req.user?._id;
    const testId = req.params.id;
    const { title, description, questions } = await req.body;
    if (!title || !description || !questions) {
      return res.sendStatus(400);
    }
    const test = await Tests.findById(testId);
    // saving to get the db id
    if (!test) {
      return res.sendStatus(404);
    }

    // save questions and options in db.
    const saveQuestions = await Promise.all(
      // first loop over the questions
      questions.map(async (ques: any) => {
        // create a new db object for question
        // this promise will return us an array of question id's
        const question = new Question({
          testId: test._id,
          questionText: ques.questionText,
        });
        // saving to get the db id
        await question.save();
        // check if options are there
        if (ques.options) {
          // now loop over the options in the request
          // this promise will return us an array of option id's
          const options = await Promise.all(
            ques.options.map(async (opt: any) => {
              const option = new Option({
                questionId: question?._id,
                optionText: opt.optionText,
                isCorrect: opt.isCorrect,
              });
              await option.save();
              return option?._id;
            })
          );
          question.options = options;
          await question.save();
        }
        return question?._id;
      })
    );
    test.title = title
    test.description = description
    test.questions = saveQuestions;
    await test.save();
    if (test) {
      return res.status(200).json(test);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    res.sendStatus(500);
    logging.error("Create Test controller error", error);
  }
};

// private route
// @ DELETE /api/v1/tests/delete/:id
// creator, admin
export const deleteTest = async (
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
    const test = await Tests.findOne({
      creator: userId?.toString(),
      _id: testId,
    });
    logging.info(test);
    if (!test) {
      return res.sendStatus(404);
    }
    await Tests.findByIdAndDelete(test._id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    logging.error("Error in delete");
  }
};
