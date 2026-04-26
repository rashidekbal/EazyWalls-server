import express from "express";
import { isValidEmail } from "../utils/Regex.js";
import ApiError from "../common/apiError.js";
import { wallpaperService } from "../services/index.sevice.js";
import logger from "../utils/pino.js";
export default async function reportIssueController(req:express.Request,res:express.Response){
  try {
      const email = req.auth?.email as string;
    const wallpaperId = req.body?.wallpaperId as string;
    const issue=req.body?.issue as string;
    if (!isValidEmail(email))
      return res
        .status(401)
        .json(new ApiError("please provide a valid auth token"));
    if (!wallpaperId)
      return res
        .status(401)
        .json(new ApiError("please provide a valid wallpaperId"));
    if(!issue)return res
        .status(401)
        .json(new ApiError("please provide a issue"));
    if(issue.length>150)return res
        .status(401)
        .json(new ApiError("issue length must be within 150 letters"));
    await wallpaperService.reportWallaperIssue(email,wallpaperId,issue);
    return res.status(200).json({message:"success"});
    
    
    
  } catch (error) {
    logger.error(error);
    return res.status(500).json({message:error})
    
  }
}