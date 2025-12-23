import mongoose from "mongoose";
import {  categoryModel } from "../model/category.js";
import {  wallpaperModel } from "../model/wallpaper.js";
import uploadOnColudinary from "./cloudinary.js";

const uploadNewWallpaper = async (
  filePath: string,
  id: mongoose.Types.ObjectId
) => {
  try {
    const link = await uploadOnColudinary(filePath);
    if (!link) {
      const result = await wallpaperModel.updateOne(
        { _id: id },
        {
          status: "failed",
        }
      );
      console.log("error + uploading");
    }
    const result = await wallpaperModel.updateOne(
      { _id: id },
      {
        previewUrl: link,
        originalUrl: link,
        status: "success",
      }
    );
  } catch (error) {
    console.log(
      "error occured mediaUplaod.ts uploadwallpaper method : ",
      error
    );
  }
};
const uploadCategoryImage = async (
  filePath: string,
  id:mongoose.Types.ObjectId
) => {
    try {
    const link = await uploadOnColudinary(filePath);
    if (!link) {
      const result = await categoryModel.updateOne(
        { _id: id },
        {
          status: "failed",
        }
      );
      console.log("error + uploading");
    }
    const result = await categoryModel.updateOne(
      { _id: id },
      {
      previewUrl:link,
      status:"success"
      }
    );
  } catch (error) {
    console.log(
      "error occured mediaUplaod.ts uploadCategory method : ",
      error
    );
  }




};
export { uploadNewWallpaper, uploadCategoryImage };
