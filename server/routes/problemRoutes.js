import express from "express";

const router = express.Router();

import {
  create,
  get,
  getAll,
  remove,
  submit,
  update,
} from "../controllers/problemController.js";
import auth from "../middleware/auth.js";

router.get("/", getAll);
router.post("/", auth, create);
router.get("/:id", get);
router.post("/:id", auth, update);
router.delete("/:id", auth, remove);

router.post("/:id/submit", auth, submit);

export default router;
