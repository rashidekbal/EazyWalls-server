import { wallpaperModel } from "../model/wallpaper.js";
const getWallpapers = async (category, page) => {
    //page number is taken for pagination;
    if (category) {
        return wallpaperModel.aggregate([
            { $match: {
                    status: "success",
                    category
                } }
        ]);
    }
    return wallpaperModel.find({ status: "success" });
};
const getWallpapersOfType = async (wallpaperType) => {
    if (wallpaperType === "FEATURED") {
        return wallpaperModel.aggregate([
            { $match: {
                    status: "success",
                    featured: true
                } }
        ]);
    }
    return wallpaperModel.aggregate([
        { $match: {
                status: "success",
                trending: true
            } }
    ]);
};
export { getWallpapers, getWallpapersOfType };
