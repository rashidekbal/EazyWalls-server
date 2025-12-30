import mongoose, { mongo } from "mongoose";
import { Wallpapertype } from "../common/enum.js";
import  wallpaperModel, { wallpaperInterface }  from "../model/wallpaper.js";
import { buildFuzzyRegex } from "../utils/Regex.js";
const getWallpapers = async (category: string | null, page: number) => {
  //page number is taken for pagination;
  if (category) {
    return wallpaperModel.find({
          status: "success",
          category,
        }).sort({updatedAt:-1});
  }
  return wallpaperModel.find({ status: "success" }).sort({ updatedAt: -1 });
};
const getNonTrendingWallPapers = async () => {
  return wallpaperModel
    .find({ status: "success", trending: false ,featured:false})
    .sort({ updatedAt: -1 });
};
const getNonFeaturedWallpapers = async () => {
  return wallpaperModel
    .find({ status: "success", featured: false ,trending:false})
    .sort({ updatedAt: -1 });
};
const getWallpapersOfType = async (wallpaperType: Wallpapertype) => {
  if (wallpaperType === "FEATURED") {
    return wallpaperModel
      .find({
        status: "success",
        featured: true,
      })
      .sort({ updatedAt: -1 });
  }
  return wallpaperModel
    .find({
      status: "success",
      trending: true,
    })
    .sort({ updatedAt: -1 });
};
const deleteWallpaper = async (id: string) => {
  let objectId = mongoose.Types.ObjectId.createFromHexString(id);
  return await wallpaperModel.deleteOne({ _id: objectId });
};
const removeTrending = async (id: string) => {
  let objectId = mongoose.Types.ObjectId.createFromHexString(id);
  return await wallpaperModel.updateOne(
    { _id: objectId },
    { $set: { trending: false } }
  );
};
const removeFeatured = async (id: string) => {
  let objectId = mongoose.Types.ObjectId.createFromHexString(id);
  return await wallpaperModel.updateOne(
    { _id: objectId },
    { $set: { featured: false } }
  );
};
const AddTrending = async (id: string) => {
  let objectId = mongoose.Types.ObjectId.createFromHexString(id);
  return await wallpaperModel.updateOne(
    { _id: objectId },
    { $set: { trending: true, featured: false } }
  );
};
const addFeatured = async (id: string) => {
  let objectId = mongoose.Types.ObjectId.createFromHexString(id);
  return await wallpaperModel.updateOne(
    { _id: objectId },
    { $set: { featured: true, trending: false } }
  );
};

const searchWallpaper=async(tag:string)=>{
  return wallpaperModel.find({tags:{
    $regex:buildFuzzyRegex(tag),
    $options:"i"
  }}).limit(50);

}
export {
  getWallpapers,
  getWallpapersOfType,
  deleteWallpaper,
  removeTrending,
  getNonFeaturedWallpapers,
  getNonTrendingWallPapers,
  AddTrending,
  addFeatured,
  removeFeatured,
  searchWallpaper,
};
