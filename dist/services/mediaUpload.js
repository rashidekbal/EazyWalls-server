import { categoryModel } from "../model/category.js";
import { wallpaperModel } from "../model/wallpaper.js";
import uploadOnColudinary from "./cloudinary.js";
const uploadNewWallpaper = async (filePath, id) => {
    try {
        const link = await uploadOnColudinary(filePath);
        if (link == null) {
            const result = await wallpaperModel.deleteOne({
                _id: id
            });
            console.log("error uploading");
            return;
        }
        const result = await wallpaperModel.updateOne({ _id: id }, {
            previewUrl: link,
            originalUrl: link,
            status: "success",
        });
    }
    catch (error) {
        console.log("error occured mediaUplaod.ts uploadwallpaper method : ", error);
    }
};
const uploadCategoryImage = async (filePath, id) => {
    try {
        const link = await uploadOnColudinary(filePath);
        if (!link) {
            const result = await categoryModel.deleteOne({
                _id: id
            });
            console.log("error + uploading");
            return;
        }
        const result = await categoryModel.updateOne({ _id: id }, {
            previewUrl: link,
            status: "success"
        });
    }
    catch (error) {
        console.log("error occured mediaUplaod.ts uploadCategory method : ", error);
    }
};
export { uploadNewWallpaper, uploadCategoryImage };
