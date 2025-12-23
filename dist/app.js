import express from "express";
import cors from "cors";
import admin_router from "./routes/admin.js";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: "*" }));
app.use("/api/v1/admin", admin_router);
export default app;
