import sql from "../config/database.js";

class Problem {
  constructor(problem) {
    this.id = problem.id;
    this.title = problem.title;
    this.body = problem.body;
    this.tags = problem.tags;
    this.sampleTests = problem.sampleTests;
    this.mainTests = problem.mainTests;
    this.timeLimit = problem.timeLimit;
    this.memoryLimit = problem.memoryLimit;
    this.difficulty = problem.difficulty;
    this.submissionsCount = problem.submissionsCount;
    this.acceptedCount = problem.acceptedCount;
    this.creator = problem.creator;
  }

  static create(newProblem) {
    return new Promise((resolve, reject) => {
      sql.query("INSERT INTO problems SET ?", newProblem, (err, res) => {
        if (err) return reject(err);
        else return resolve({ ...newProblem });
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      sql.query("SELECT * FROM problems WHERE id = ?", id, (err, res) => {
        if (err) return reject(err);
        else if (res.length == 0)
          return reject({ message: "Problem not found!" });
        else return resolve(res[0]);
      });
    });
  }

  static update = (problem) => {
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE problems SET title = ?, body = ?, tags = ?, sampleTests = ?, mainTests = ?, timeLimit = ?, memoryLimit = ?, difficulty = ? WHERE id = ?",
        [
          problem.title,
          problem.body,
          problem.tags,
          problem.sampleTests,
          problem.mainTests,
          problem.timeLimit,
          problem.memoryLimit,
          problem.difficulty,
          problem.id,
        ],
        (err, res) => {
          if (err) return reject(err);
          else if (res.affectedRows == 0)
            return reject({ message: "Problem not found!" });
          else return resolve({ ...problem });
        }
      );
    });
  };

  static remove = (id) => {
    return new Promise((resolve, reject) => {
      sql.query("DELETE FROM problems WHERE id = ?", id, (err, res) => {
        if (err) return reject(err);
        else if (res.affectedRows == 0)
          return reject({ message: "Problem not found!" });
        else return resolve(res);
      });
    });
  };
}

export default Problem;
