import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/user", userRoutes);
app.use("/problem", problemRoutes);

app.listen(PORT, () => console.log("Server is listening at Port : ", PORT));
