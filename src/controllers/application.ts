import { log } from "@drantaz/f-log";
import Application from "../models/application";

export const createApplication = async (req, res) => {
  const { job_id, applicant_name, applicant_email, resume } = req.body;
  try {
    if (!applicant_email || !applicant_name || !resume)
      return res.status(400).json({ message: "Fill in all required fields" });
    await Application.create({
      job_id,
      applicant_email,
      applicant_name,
      resume,
      applicantion_date: new Date().toISOString(),
    });
    res.sendStatus(201);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const getApplications = async (req, res) => {
  const { job_id } = req.params;
  const { offset, limit } = req.query;
  try {
    const { rows, count } = await Application.findAndCountAll({
      where: { job_id },
      order: [["createdAt", "DESC"]],
      offset: Number(offset ?? 0) ?? 0,
      limit: Number(limit ?? 10) ?? 10,
    });
    res.json({ data: rows, meta: { total: count } });
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};
