import ApiError from "../common/apieError.js";
import { getWallpapers, getWallpapersOfType } from "../repository/wallpaper.js";
import ApiResponse from "../common/apiResponse.js";
const getWallaperController = async (req, res) => {
    const category = req.query?.category;
    const wallpaperType = req.query?.type;
    try {
        //if wallpaper type provided then it overrides the request category dosent matter
        if (wallpaperType) {
            if (wallpaperType === "featured") {
                let response = await getWallpapersOfType("FEATURED");
                return res.status(200).json(new ApiResponse(response));
            }
            else if (wallpaperType === "trending") {
                let response = await getWallpapersOfType("TRENDING");
                return res.status(200).json(new ApiResponse(response));
            }
        }
        //if no wallpaper type or not any type match category previals
        if (category) {
            let response = await getWallpapers(category, 1);
            return res.status(200).json(new ApiResponse(response));
        }
        /// if neither of the above case works give default response
        let response = await getWallpapers(null, 1);
        return res.status(200).json(new ApiResponse(response));
    }
    catch (error) {
        return res.status(500).json(new ApiError("error on server"));
    }
};
export { getWallaperController };
