import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  problemId: { type: String, required: true, index: true },
  language: { type: Number, required: true },
  code: { type: String },
  verdicts: { type: [Number], default: [] },
  status: { type: Number, required: true },
});

const Submission = mongoose.Model("Submission", submissionSchema);
export default Submission;
