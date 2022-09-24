import express from "express";

const router = express.Router();

import { getAll, get } from "../controllers/submissionController.js";
import auth from "../middleware/auth.js";

router.get("/", auth, getAll);
router.get("/:id", auth, get);

export default router;
