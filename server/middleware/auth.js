import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ message: "You are Unauthorized!" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.username = verified.username;

    next();
  } catch (err) {
    res.json({ message: "You are Unauthorized!" });
  }
};

export default auth;
