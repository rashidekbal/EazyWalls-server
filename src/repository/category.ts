import { categoryModel } from "../model/category.js";
const getCategories=async()=>{
   return await categoryModel.aggregate([
  {
    $match: {
      status: "success",
    },
  },
  {
    $lookup: {
      from: "wallpapers",
      localField: "title",
      foreignField: "category",
      as: "wallpaper",
    },
  },
  {
    $addFields: {
      wallpaperCount: { $size: "$wallpaper" },
    },
  },
  {
    $sort: {
      updatedAt: -1,
    },
  },
  {
    $project: {
      wallpaper: 0,
      createdAt: 0,
      __v: 0,
    },
  },
]);

}

export {getCategories}