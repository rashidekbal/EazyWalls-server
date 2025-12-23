import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


//upload on cloudnary from storage

async function uploadOnColudinary(localpath:string) {
  try {
    if (!localpath) return null;
    let response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localpath);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localpath); //remove temp file
    console.log(error);
    return null;
  }
}

export default uploadOnColudinary;
