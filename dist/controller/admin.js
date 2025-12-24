import { uploadCategoryImage, uploadNewWallpaper } from "../services/mediaUpload.js";
import { wallpaperModel } from "../model/wallpaper.js";
import { categoryModel } from "../model/category.js";
const uploadWallpaperController = async (req, res) => {
    const filePath = req.file?.path;
    const category = req.body?.category;
    let tag = req.body?.tags;
    if (!filePath || !category || !tag)
        return res.sendStatus(400);
    const tags = tag.split(",");
    try {
        let response = await wallpaperModel.create({
            category: category,
            tags: tags,
            author: "rashid",
            previewUrl: null,
            originalUrl: "placeholder",
            status: "uploading"
        });
        console.log(response._id);
        uploadNewWallpaper(filePath, response._id);
        return res.sendStatus(201);
    }
    catch (error) {
        return res.sendStatus(500);
    }
};
const addCategoryController = async (req, res) => {
    const filePath = req.file?.path;
    const category = req.body?.category;
    if (!filePath || !category)
        return res.sendStatus(400);
    try {
        let response = await categoryModel.create({
            title: category,
            previewUrl: "placeholder",
        });
        console.log(response._id);
        uploadCategoryImage(filePath, response._id);
        return res.sendStatus(201);
    }
    catch (error) {
        return res.sendStatus(500);
    }
};
export { uploadWallpaperController, addCategoryController };
