import express from "express";
import { getNonFeaturedWallpaperController, getNonTrendingWallpaperController, getWallaperController } from "../controller/wallpaper.js";
const router = express.Router();
router.route("/").get(getWallaperController);
router.route("/getNoFeatured").get(getNonFeaturedWallpaperController);
router.route("/getNonTrending").get(getNonTrendingWallpaperController);
export default router;
