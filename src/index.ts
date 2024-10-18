import { config } from "dotenv";
config();
import { log } from "@drantaz/f-log";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import jobRoutes from "./routes/job.routes";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: "100mb" }));

app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);

app.listen(parseInt(port, 10), () => {
  log(`App is running at http://localhost:${port}`, "debug", false);
});
