import sql from "../config/database.js";

class User {
  constructor(user) {
    this.username = user.username;
    this.passwordHash = user.passwordHash;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.emailAddress = user.emailAddress;
    this.dob = user.dob;
    this.avatar = user.avatar;
  }

  static create(newUser) {
    return new Promise((resolve, reject) => {
      sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) return reject(err);
        else return resolve({ ...newUser });
      });
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM users WHERE username = ?",
        username,
        (err, res) => {
          if (err) return reject(err);
          else if (res.length == 0)
            return reject({ message: "User not found!" });
          else return resolve(res[0]);
        }
      );
    });
  }

  static findByEmail(emailAddress) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM users WHERE emailAddress = ?",
        emailAddress,
        (err, res) => {
          if (err) return reject(err);
          else if (res.length == 0)
            return reject({ message: "User not found!" });
          else return resolve(res[0]);
        }
      );
    });
  }

  static update = (user) => {
    return new Promise((resolve, reject) => {
      console.log(user.username);
      sql.query(
        "UPDATE users SET firstName = ?, lastName = ?, emailAddress = ?, dob = ?, avatar = ? WHERE username = ?",
        [
          user.firstName,
          user.lastName,
          user.emailAddress,
          user.dob,
          user.avatar,
          user.username,
        ],
        (err, res) => {
          if (err) return reject(err);
          else if (res.affectedRows == 0)
            return reject({ message: "User not found!" });
          else return resolve({ ...user });
        }
      );
    });
  };

  static remove = (username) => {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM users WHERE username = ?",
        username,
        (err, res) => {
          if (err) return reject(err);
          else if (res.affectedRows == 0)
            return reject({ message: "User not found!" });
          else return resolve(res);
        }
      );
    });
  };
}

export default User;
