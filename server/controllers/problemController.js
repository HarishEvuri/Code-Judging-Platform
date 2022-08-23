import Problem from "../models/problemModel.js";

export const create = async (req, res) => {
  const creatorId = req.userId;

  const {
    title,
    body,
    tags,
    sampleTests,
    mainTests,
    timeLimit,
    memoryLimit,
    difficulty,
  } = req.body;

  if (!title || !timeLimit || !memoryLimit || !difficulty)
    return res
      .status(404)
      .json({ message: "Please Enter all required fields!" });

  const newProblem = new Problem({
    title,
    body,
    tags,
    sampleTests,
    mainTests,
    timeLimit,
    memoryLimit,
    difficulty,
    submissionsCount: 0,
    acceptedCount: 0,
    creatorId,
  });

  const savedProblem = await newProblem.save();

  res.status(201).json(savedProblem);
};

export const get = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await Problem.findById(id);
    res.status(200).json(problem);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const creatorId = req.userId;
  const { id } = req.params;

  const {
    title,
    body,
    tags,
    sampleTests,
    mainTests,
    timeLimit,
    memoryLimit,
    difficulty,
  } = req.body;

  if (!title || !timeLimit || !memoryLimit || !difficulty)
    return res
      .status(404)
      .json({ message: "Please Enter all required fields!" });

  const problem = await Problem.findById(id);
  if (!problem)
    return res.status(404).json({ message: `No Problem with the given id!` });

  if (problem.creatorId !== creatorId)
    return res
      .status(404)
      .json({ message: `You have no access to this problem!` });

  problem.title = title;
  problem.body = body;
  problem.tags = tags;
  problem.sampleTests = sampleTests;
  problem.mainTests = mainTests;
  problem.difficulty = difficulty;

  await problem.save();
  return res.status(201).json(problem);
};

export const remove = async (req, res) => {
  const creatorId = req.userId;
  const { id } = req.params;

  const problem = await Problem.findById(id);
  if (!problem)
    return res.status(203).json({ message: `No Problem with the given id!` });

  if (problem.creatorId !== creatorId)
    return res
      .status(404)
      .json({ message: `You have no access to this problem!` });

  await problem.delete();
  res.send();
};
