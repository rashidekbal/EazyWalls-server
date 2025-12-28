import { response } from "express";
import { updateCategoryImage, uploadCategoryImage, uploadNewWallpaper } from "../services/mediaUpload.js";
import wallpaperModel from "../model/wallpaper.js";
import categoryModel from "../model/category.js";
import { addFeatured, AddTrending, deleteWallpaper, removeFeatured, removeTrending } from "../repository/wallpaper.js";
import connectDB from "../db/connection.js";
const uploadWallpaperController = async (req, res) => {
    const filePath = req.file?.path;
    const category = req.body?.category;
    let tag = req.body?.tags;
    let isfeatured = req.body?.isFeatured;
    let istrending = req.body?.isTrending;
    if (!filePath || !category || !tag)
        return res.sendStatus(400);
    const tags = tag.split(",");
    try {
        await connectDB();
        let response = await wallpaperModel.create({
            category: category,
            tags: tags,
            author: "rashid",
            previewUrl: null,
            originalUrl: "placeholder",
            status: "uploading",
            trending: istrending,
            featured: isfeatured,
            height: 0,
            width: 0
        });
        console.log(response._id);
        await uploadNewWallpaper(filePath, response._id);
        return res.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
const addCategoryController = async (req, res) => {
    const filePath = req.file?.path;
    const category = req.body?.category;
    if (!filePath || !category)
        return res.sendStatus(400);
    try {
        await connectDB();
        let response = await categoryModel.create({
            title: category,
            previewUrl: "placeholder",
        });
        console.log(response._id);
        await uploadCategoryImage(filePath, response._id);
        return res.sendStatus(201);
    }
    catch (error) {
        return res.sendStatus(500);
    }
};
const deleteWallpaperController = async (req, res) => {
    let ids = req.body?.ids;
    if (!ids)
        return response.sendStatus(400);
    let idArray = ids.split(",");
    try {
        await connectDB();
        idArray.forEach(async (id) => {
            if (id.length < 24) {
                return;
            }
            await deleteWallpaper(id);
        });
        res.status(200).json({ msg: "success" });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
const updateCategoryPreviewUrlController = async (req, res) => {
    const filePath = req.file?.path;
    const category = req.body?.category;
    if (!filePath || !category)
        return res.sendStatus(400);
    try {
        await connectDB();
        await updateCategoryImage(filePath, category);
        return res.sendStatus(200);
    }
    catch (error) {
        console.log("error uploading " + error);
        return res.sendStatus(500);
    }
};
const removeTrendingController = async (req, res) => {
    let ids = req.body?.ids;
    if (!ids)
        return response.sendStatus(400);
    let idArray = ids.split(",");
    try {
        await connectDB();
        idArray.forEach(async (id) => {
            if (id.length < 24) {
                return;
            }
            await removeTrending(id);
        });
        res.status(200).json({ msg: "success" });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
const removeFeaturedController = async (req, res) => {
    let ids = req.body?.ids;
    if (!ids)
        return response.sendStatus(400);
    let idArray = ids.split(",");
    try {
        await connectDB();
        idArray.forEach(async (id) => {
            if (id.length < 24) {
                return;
            }
            await removeFeatured(id);
        });
        res.status(200).json({ msg: "success" });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
const addTrendingWallpaperController = async (req, res) => {
    let ids = req.body?.ids;
    if (!ids)
        return response.sendStatus(400);
    let idArray = ids.split(",");
    try {
        await connectDB();
        idArray.forEach(async (id) => {
            if (id.length < 24) {
                return;
            }
            await AddTrending(id);
        });
        res.status(200).json({ msg: "success" });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
const addFeaturedWallpaperController = async (req, res) => {
    let ids = req.body?.ids;
    if (!ids)
        return response.sendStatus(400);
    let idArray = ids.split(",");
    try {
        await connectDB();
        idArray.forEach(async (id) => {
            if (id.length < 24) {
                return;
            }
            await addFeatured(id);
        });
        res.status(200).json({ msg: "success" });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
export { uploadWallpaperController, addCategoryController, deleteWallpaperController, updateCategoryPreviewUrlController, removeTrendingController, addTrendingWallpaperController, addFeaturedWallpaperController, removeFeaturedController };
