import { v4 as uuidv4 } from "uuid";

import Problem from "../models/problemModel.js";

export const create = async (req, res) => {
  const creator = req.username;

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

  const id = uuidv4();
  const newProblem = new Problem({
    id,
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
    creator,
  });

  try {
    const data = await Problem.create(newProblem);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const get = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findById(id);
    return res.status(201).json(problem);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  const creator = req.username;
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

  try {
    const problem = await Problem.findById(id);
    if (problem.creator !== creator)
      return res.status(404).json({ message: "You do not have access!" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }

  try {
    const data = await Problem.update({
      id,
      title,
      body,
      tags,
      sampleTests,
      mainTests,
      timeLimit,
      memoryLimit,
      difficulty,
    });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  const creator = req.username;
  const { id } = req.params;

  try {
    const problem = await Problem.findById(id);
    if (problem.creator !== creator)
      return res.status(404).json({ message: "You do not have access!" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }

  try {
    const data = await Problem.remove(id);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
