import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  tags: { type: Array, default: [] },
  sampleTests: { type: [{ input: String, output: String }], default: [] },
  mainTests: { type: [{ input: String, output: String }], default: [] },
  timeLimit: { type: Number },
  memoryLimit: { type: Number },
  difficulty: { type: Number },
  submissionsCount: { type: Number, default: 0 },
  acceptedCount: { type: Number, default: 0 },
  acceptance: { type: Number, default: 0 },
  creatorId: { type: String, required: true },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
