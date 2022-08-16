import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export const register = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    emailAddress,
    dob,
  } = req.body;

  if (
    !username ||
    !firstName ||
    !lastName ||
    !password ||
    !confirmPassword ||
    !emailAddress ||
    !dob
  )
    return res
      .status(404)
      .json({ message: "Please Enter all required fields!" });

  if (password.length < 6)
    return res
      .status(404)
      .json({ message: "Please set a password of atleast 6 characters!" });

  if (password !== confirmPassword)
    return res.status(404).json({ message: "Passwords do not match!" });

  try {
    await User.findByEmail(emailAddress);
    return res.status(404).json({ message: "Email already exits!" });
  } catch (err) {}

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    passwordHash,
    firstName,
    lastName,
    emailAddress,
    dob,
  });

  try {
    const data = await User.create(newUser);
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 604800000,
      })
      .json(data);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(404).json({ message: "Username already exists!" });
    else return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(404)
      .json({ message: "Please Enter all required fields!" });

  try {
    const user = await User.findByUsername(username);
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect)
      return res.status(404).json({ message: "Invalid Credentials!" });
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 604800000,
      })
      .json(user);
  } catch (err) {
    return res.status(404).json({ message: "Invalid Credentials!" });
  }
};

export const logout = async (req, res) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

export const update = async (req, res) => {
  const username = req.username;

  const { firstName, lastName, emailAddress, dob, avatar } = req.body;

  try {
    const data = await User.update({
      firstName,
      lastName,
      emailAddress,
      dob,
      avatar,
      username,
    });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
