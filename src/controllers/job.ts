import { log } from "@drantaz/f-log";
import Job from "../models/job";
import { Op } from "sequelize";
import Application from "../models/application";

export const createJob = async (req, res) => {
  const { data } = req.body;
  try {
    const job = await Job.create({ ...data });
    res.status(201).json(job);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const getJobs = async (req, res) => {
  const { offset, limit, term } = req.query;
  try {
    const filters = [
      { title: { [Op.iLike]: `%${term ?? ""}%` } },
      { location: { [Op.iLike]: `%${term ?? ""}%` } },
      { company: { [Op.iLike]: `%${term ?? ""}%` } },
    ];
    const { rows, count } = await Job.findAndCountAll({
      where: {
        [Op.or]: filters,
      },
      order: [["createdAt", "DESC"]],
      limit: Number(limit) ?? 10,
      offset: Number(offset) ?? 0,
    });
    res.json({ data: rows, meta: { total: count } });
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const getJob = async (req, res) => {
  const { job_id } = req.params;
  try {
    const job = await Job.findByPk(job_id);
    if (!job) return res.status(404).json({ message: "Job not found!" });
    res.json(job);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const updateJob = async (req, res) => {
  const { job_id } = req.params;
  const { data } = req.body;
  try {
    const [_, jobs] = await Job.update(
      { ...data },
      { where: { id: job_id }, returning: true }
    );
    res.json(jobs[0]);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const deleteJob = async (req, res) => {
  const { job_id } = req.params;
  try {
    // TODO: check if job exist to avoid unnecessary deletion

    // delete all associated applications
    await Application.destroy({ where: { job_id } });
    await Job.destroy({ where: { id: job_id } });
    res.sendStatus(204);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};
