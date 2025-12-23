import express from "express";
import ApiError from "../common/apieError.js";
import { getWallpapers } from "../model/repository/wallpaper.js";
import ApiResponse from "../common/apiResponse.js";
const getWallaperController=async(req:express.Request,res:express.Response)=>{
    const category:string|undefined=req.query?.category as string;
    try {
      if(category){
       let response=await getWallpapers(category,1);
       return res.status(200).json(new ApiResponse(response));
      }
      let response=await getWallpapers(null,1);
      return res.status(200).json(new ApiResponse(response));
 
    } catch (error) {
        return res.status(500).json(new ApiError("error on server"));        
    }

}
export {getWallaperController}