import categoryModel from "../model/category.js";
import wallpaperModel from "../model/wallpaper.js";
import uploadOnColudinary from "./cloudinary.js";
const getPreviewUrl = (url) => {
    let previewUrl = url.split("/upload/");
    let final = previewUrl[0] + "/upload/w_400,q_auto/" + previewUrl[1];
    return final;
};
const uploadNewWallpaper = async (filePath, id) => {
    try {
        const uploadResult = await uploadOnColudinary(filePath);
        if (uploadResult == null) {
            const result = await wallpaperModel.deleteOne({
                _id: id
            });
            console.log("error uploading");
            return;
        }
        const result = await wallpaperModel.updateOne({ _id: id }, {
            previewUrl: getPreviewUrl(uploadResult.secure_url),
            originalUrl: uploadResult.secure_url,
            status: "success",
            height: uploadResult.height,
            width: uploadResult.width,
            public_id: uploadResult.public_id
        });
    }
    catch (error) {
        console.log("error occured mediaUplaod.ts uploadwallpaper method : ", error);
    }
};
const uploadCategoryImage = async (filePath, id) => {
    try {
        const uploadResult = await uploadOnColudinary(filePath);
        if (!uploadResult) {
            const result = await categoryModel.deleteOne({
                _id: id
            });
            console.log("error + uploading");
            return;
        }
        const result = await categoryModel.updateOne({ _id: id }, {
            previewUrl: getPreviewUrl(uploadResult.secure_url),
            status: "success",
            public_id: uploadResult.public_id
        });
    }
    catch (error) {
        console.log("error occured mediaUplaod.ts uploadCategory method : ", error);
    }
};
const updateCategoryImage = async (filePath, category) => {
    try {
        const uploadResult = await uploadOnColudinary(filePath);
        if (!uploadResult) {
            throw new Error("error upload failed");
        }
        const result = await categoryModel.updateOne({ title: category }, {
            previewUrl: getPreviewUrl(uploadResult.secure_url),
            status: "success",
            public_id: uploadResult.public_id
        });
    }
    catch (error) {
        console.log("error occured mediaUplaod.ts uploadCategory method : ", error);
    }
};
export { uploadNewWallpaper, uploadCategoryImage, updateCategoryImage };
