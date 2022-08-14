import User from "./models/userModel.js";

const user = new User({
  username: "harishevuri2",
  firstName: "Harish",
  lastName: "Evuri",
  emailAddress: "harishevuri@gmail.com",
});

User.create(user, (err, data) => {
  if (err) console.log(err.message);
  else console.log(data);
});
