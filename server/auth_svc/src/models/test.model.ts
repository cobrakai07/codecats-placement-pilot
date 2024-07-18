import { Schema, Document, model } from "mongoose";
// type's
export interface ITest extends Document {
  creator: Schema.Types.ObjectId;
  title: string;
  description: string;
  questions: Schema.Types.ObjectId[];
}
// schema
const TestSchema: Schema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

const Tests = model<ITest>("Test", TestSchema);
export default Tests;
