import express from "express"
import cors from "cors";
import admin_router from "./routes/admin.js"
import categoryRouter from "./routes/category.js"
import wallpaperRouter from "./routes/wallpaper.js"
const app =express();
app.use(express.json({limit:"16kb"}));
app.use(cors({origin:"*"}));
app.use("/api/v1/admin",admin_router);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/wallpaper",wallpaperRouter)
export default app;