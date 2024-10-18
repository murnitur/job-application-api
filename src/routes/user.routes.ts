import express from "express";
import { authenticate, createUser } from "../controllers/user";
const router = express.Router();

router.route("/authenticate").post(authenticate);
router.route("/").post(createUser);

export default router;
