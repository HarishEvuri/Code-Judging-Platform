import Submission from "../models/submissionModel.js";

// need to add pagination

export const getAll = async (req, res) => {
  const userId = req.userId;

  try {
    const submissions = await Submission.find({ user: userId })
      .select(["-code"])
      .populate("problem", "title");

    res.status(201).send(submissions);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const get = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    const submission = await Submission.findById(id).populate(
      "problem",
      "title"
    );

    if (!submission)
      return res.status(404).json({ message: "No submission with the id!" });

    if (submission.user.toString() !== userId)
      return res.status(404).json({ message: "No access to this submission!" });

    return res.status(201).json({ submission });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
