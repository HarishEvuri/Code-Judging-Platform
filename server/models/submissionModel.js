import mongoose from "mongoose";
const { Schema } = mongoose;

const submissionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "User",
  },
  problem: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "Problem",
  },
  language: { type: Number, required: true },
  code: { type: String },
  verdicts: { type: [Number], default: [] },
  status: { type: Number, required: true },
  errorMessage: { type: String },
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
