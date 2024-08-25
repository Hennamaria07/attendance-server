import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import projectRoute from './routes/project.routes.js';
import attendaceRoute from './routes/attendance.routes.js';
import dotenv from 'dotenv'
dotenv.config()

const app = new express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/attendance", attendaceRoute);
app.use("/api/v1/projects", projectRoute);



export default app