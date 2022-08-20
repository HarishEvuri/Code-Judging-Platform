import express from "express";

const router = express.Router();

import {
  create,
  get,
  remove,
  update,
} from "../controllers/problemController.js";
import auth from "../middleware/auth.js";

router.post("/", auth, create);
router.get("/:id", get);
router.post("/:id", auth, update);
router.delete("/:id", auth, remove);

export default router;