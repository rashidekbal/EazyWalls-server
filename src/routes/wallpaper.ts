import express from "express";
import { getWallaperController } from "../controller/wallpaper.js";
const router =express.Router();

router.route("/").get(getWallaperController)

export default router;