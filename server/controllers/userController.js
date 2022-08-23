import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

export const register = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    dob,
  } = req.body;

  if (!username || !password || !confirmPassword || !email)
    return res
      .status(404)
      .json({ message: "Please Enter all required fields!" });

  if (password.length < 6)
    return res
      .status(404)
      .json({ message: "Please set a password of atleast 6 characters!" });

  if (password !== confirmPassword)
    return res.status(404).json({ message: "Passwords do not match!" });

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(404).json({
      message: "Username already exists!",
    });

  const existingEmail = await User.findOne({ email });
  if (existingEmail)
    return res.status(404).json({
      message: "Email already exists!",
    });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    passwordHash,
    firstName,
    lastName,
    email,
    dob,
  });

  const savedUser = await newUser.save();

  const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 604800000,
    })
    .json(savedUser);
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(404)
      .json({ message: "Please Enter all required fields!" });

  const existingUser = await User.findOne({ username });

  if (!existingUser)
    return res.status(404).json({ message: "Invalid credentials!" });

  const passwordCorrect = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );

  if (!passwordCorrect)
    return res.status(404).json({ message: "Invalid credentials!" });

  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 604800000,
    })
    .json(existingUser);
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
  const userId = req.userId;

  const existingUser = await User.findById(userId);
  existingUser.firstName = req.body.firstName;
  existingUser.lastName = req.body.lastName;
  existingUser.dob = req.body.dob;
  existingUser.avatar = req.body.avatar;

  existingUser.save();

  res.status(201).json(existingUser);
};
