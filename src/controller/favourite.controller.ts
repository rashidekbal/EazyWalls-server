import express from "express";
import { isValidEmail } from "../utils/Regex.js";
import ApiError from "../common/apiError.js";
import { wallpaperService } from "../services/index.sevice.js";
import ApiResponse from "../common/apiResponse.js";
import logger from "../utils/pino.js";
const addFavouriteController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const email = req.auth?.email as string;
    const wallpaperId = req.body?.wallpaperId as string;
    if (!isValidEmail(email))
      return res
        .status(401)
        .json(new ApiError("please provide a valid auth token"));
    if (!wallpaperId)
      return res
        .status(401)
        .json(new ApiError("please provide a valid wallpaperId"));
    await wallpaperService.addFavourite(email, wallpaperId);
    return res.status(201).json({ message: "success" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json(new ApiError("internal server error"));
  }
};
const removeFavouriteController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const email = req.auth?.email as string;
    const wallpaperId = req.body?.wallpaperId as string;
    if (!isValidEmail(email))
      return res
        .status(401)
        .json(new ApiError("please provide a valid auth token"));
    if (!wallpaperId)
      return res
        .status(401)
        .json(new ApiError("please provide a valid wallpaperId"));
    await wallpaperService.removeFavourite(email, wallpaperId);
    return res.status(201).json({ message: "success" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json(new ApiError("internal server error"));
  }
};
const getFavouriteController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const email = req.auth?.email as string;
    let pageQuery=req.query?.page;
    let page=Number(pageQuery)
    if(isNaN(Number(page)))page=1;
    if (!isValidEmail(email))
      return res
        .status(401)
        .json(new ApiError("please provide a valid auth token"));
   
    const result=await wallpaperService.getFavourites(email,Number(page));
    return res.status(201).json(new ApiResponse(result));
  } catch (error) {
    logger.error(error);
    return res.status(500).json(new ApiError("internal server error"));
  }
};

export{
    removeFavouriteController,
    addFavouriteController,
    getFavouriteController
}