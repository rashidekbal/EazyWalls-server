import express from "express"
import uploadFile from "../middlewares/multer.js";
import { addCategoryController, uploadWallpaperController } from "../controller/admin.js";
const router=express.Router();

router.route("/wallpaper").post(uploadFile.single("image"),uploadWallpaperController);
router.route("/category").post(uploadFile.single("image"),addCategoryController)
export default router;