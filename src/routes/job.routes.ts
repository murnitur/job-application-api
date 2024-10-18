import express from "express";
import auth from "../middlewares/auth";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../controllers/job";
import { createApplication, getApplications } from "../controllers/application";

const router = express.Router();

router
  .route("/")
  .post(auth as any, createJob)
  .get(getJobs);

router
  .route("/:job_id/applications")
  .post(createApplication)
  .get(auth as any, getApplications);

router
  .route("/:job_id")
  .get(getJob)
  .put(auth as any, updateJob)
  .delete(auth as any, deleteJob);

export default router;
