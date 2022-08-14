import sql from "../config/database.js";

class User {
  constructor(user) {
    this.username = user.username;
    this.passwordHash = user.passwordHash;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.emailAddress = user.emailAddress;
  }

  static create(newUser, result) {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newUser });
    });
  }
}

export default User;
