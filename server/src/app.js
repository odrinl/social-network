import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
