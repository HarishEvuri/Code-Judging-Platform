import express from "express";

const router = express.Router();

import {
  login,
  logout,
  register,
  update,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/update", auth, update);

export default router;
