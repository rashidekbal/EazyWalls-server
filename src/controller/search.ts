import express  from "express";
import ApiError from "../common/apieError.js";
import { searchWallpaper } from "../repository/wallpaper.js";
import ApiResponse from "../common/apiResponse.js";
import { searchCategories } from "../repository/category.js";
const searchController=async(req:express.Request,res:express.Response)=>{
    const query=req.query.target as string;
    if(!query)return res.status(400).json(new ApiError("please provide search target"));
    try {
        let wallpapers =await searchWallpaper(query);
        let categories=await searchCategories(query);
       return res.status(200).json(new ApiResponse([{wallpapers},{categories}]));
    } catch (error) {
        console.log("error : ",error);
       return res.status(500).json(new ApiError(error));
    }

}

export {searchController}