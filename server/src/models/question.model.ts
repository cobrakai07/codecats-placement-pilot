import { Document, Schema, model } from "mongoose";
// type's
export interface IQuestion extends Document {
  testId: Schema.Types.ObjectId;
  questionText: string;
  options: Schema.Types.ObjectId[];
}
// schema
const QuestionSchema: Schema = new Schema(
  {
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    questionText: { type: String, required: true },
    options: [{ type: Schema.Types.ObjectId, ref: "Option" }],
  },
  { timestamps: true }
);

const Question = model<IQuestion>("Question", QuestionSchema);
export default Question;
