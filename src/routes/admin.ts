import express from "express"
import uploadFile from "../middlewares/multer.js";
import { addCategoryController, deleteWallpaperController, uploadWallpaperController,updateCategoryPreviewUrlController, removeTrendingController, addTrendingWallpaperController, removeFeaturedController, addFeaturedWallpaperController } from "../controller/admin.js";
const router=express.Router();

router.route("/wallpaper").post(uploadFile.single("image"),uploadWallpaperController).patch(deleteWallpaperController);
router.route("/category").post(uploadFile.single("image"),addCategoryController).patch(uploadFile.single("image"),updateCategoryPreviewUrlController);
router.route("/trending/remove").patch(removeTrendingController);
router.route("/trending/add").post(addTrendingWallpaperController);
router.route("/featured/remove").patch(removeFeaturedController);
router.route("/featured/add").post(addFeaturedWallpaperController);
export default router;