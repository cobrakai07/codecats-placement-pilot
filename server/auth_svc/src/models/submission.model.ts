import { Document, Schema, model } from "mongoose";

export interface IUserQuizSubmission extends Document {
  userId: Schema.Types.ObjectId;
  testId: Schema.Types.ObjectId;
  score?: number;
}

const SubmissionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  testId: { type: Schema.Types.ObjectId, required: true, ref: "Test" },
  score: { type: Number },
});

const Submission = model<IUserQuizSubmission>("Submission", SubmissionSchema);
export default Submission;
