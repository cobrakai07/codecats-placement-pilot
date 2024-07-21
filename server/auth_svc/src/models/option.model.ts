import mongoose, { Document, Schema } from "mongoose";

export interface IOption extends Document {
  questionId: Schema.Types.ObjectId;
  optionText: string;
  isCorrect: boolean;
}

const OptionSchema: Schema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    optionText: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { timestamps: true }
);
const Option = mongoose.model<IOption>("Option", OptionSchema);
export default Option;
