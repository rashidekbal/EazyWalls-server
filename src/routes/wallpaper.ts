import express from "express";
import { getNonFeaturedWallpaperController, getNonTrendingWallpaperController, getWallaperController } from "../controller/wallpaper.js";
import verifyToken from "../middlewares/authorization.js";
import { addFavouriteController, getFavouriteController, removeFavouriteController } from "../controller/favourite.controller.js";
const router =express.Router();

router.route("/").get(getWallaperController);
router.route("/getNoFeatured").get(getNonFeaturedWallpaperController);
router.route("/getNonTrending").get(getNonTrendingWallpaperController);
router.route("/favourite").get(verifyToken,getFavouriteController).post(verifyToken,addFavouriteController).delete(verifyToken,removeFavouriteController);

export default router;