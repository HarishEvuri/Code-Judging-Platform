import Problem from "../models/problemModel.js";
import Submission from "../models/submissionModel.js";
import { judge } from "../judge/judge.js";

export const getAll = async (req, res) => {
  const { search, tags, difficulty, orderBy, order, page, limit } = req.query;

  const LIMIT = Number(limit) || 50;
  const startIndex = (Number(page) - 1) * LIMIT;
  console.log(search, tags, difficulty, orderBy, order, page, limit);

  try {
    const title = new RegExp(search, "i");
    const total = await Problem.countDocuments({});

    const filterList = [];

    if (title) filterList.push({ title });
    if (tags) filterList.push({ tags: { $all: tags.split(",") } });
    if (difficulty) filterList.push({ difficulty });

    const problems = await Problem.find({
      $and: filterList,
    })
      .select(["_id", "title", "difficulty", "tags", "acceptance"])
      .sort([[orderBy, Number(order)]])
      .limit(LIMIT)
      .skip(startIndex);

    res.status(201).json({
      data: problems,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

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
    const problem = await Problem.findById(id).select([
      "-mainTests",
      "-creatorId",
    ]);
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
    return res.status(404).json({ message: "No Problem with the id!" });

  if (problem.creatorId !== creatorId)
    return res.status(404).json({ message: "No access to this problem!" });

  problem.title = title;
  problem.body = body;
  problem.tags = tags;
  problem.sampleTests = sampleTests;
  problem.mainTests = mainTests;
  problem.difficulty = difficulty;
  problem.timeLimit = timeLimit;
  problem.memoryLimit = memoryLimit;

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

export const submit = async (req, res) => {
  const problemId = req.params.id;
  const userId = req.userId;

  const { code, language } = req.body;

  if (!code || !language)
    return res
      .status(404)
      .json({ message: "Please Enter all required fields!" });

  const problem = await Problem.findById(problemId);

  if (!problem)
    return res.status(404).json({ message: "No problem with the id!" });

  res.send();

  // const newSubmission = new Submission({
  //   user: userId,
  //   problem: problemId,
  //   language,
  //   code,
  //   status: 0,
  // });

  // await newSubmission.save();

  // res.status(201).json(newSubmission);
};
