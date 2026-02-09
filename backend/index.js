import dotenv from "dotenv";
import express from "express";
import connnectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import aiRoute from "./routes/ai.route.js";
import userRoute from "./routes/user.route.js";
import workspaceRoute from "./routes/workspace.route.js";
import cors from "cors";
import path from "path";

dotenv.config({
  path: "./.env",
});

const app = express();
const port = process.env.PORT || 5000;

//cors
// const allowedOrigins = ["http://localhost:8080", "http://localhost:5173",
//     "https://quickcode-ng.netlify.app/"];
// const corsOptions = {
//     origin: (origin, callback) => {
//         // Allow requests with no origin (like mobile apps, curl requests)
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true // Allow credentials
// };

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:5173",
      "https://quickcode-ng.netlify.app",
      "https://quickkcode.vercel.app",
    ],
    credentials: true,
  }),
);

//middlewares
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(express.json({ limit: "16mb" }));
app.use(cookieParser());

//api
app.use("/api/v1/ai", aiRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/workspace", workspaceRoute);

app.get("/", (req, res) => {
  res.send("Welcome to QuickCode AI");
});

connnectDB();

//Serving frontend
// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, "frontend", "dist")));

// app.get("/", (_, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
