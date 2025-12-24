import { categoryModel } from "../model/category.js";
const getCategories=async()=>{
    return await categoryModel.aggregate([
      {$match:{
        status:"success"
      }},
      {
        
        $lookup: {
          from: "wallpapers",
          localField: "title",
          foreignField: "category",
          as: "wallpaper",
        },
      },
      { $addFields: { wallpaperCount: { $size: "$wallpaper" } } },
      {
        $project: { wallpaper: 0, _id: 1, createdAt: 0, updatedAt: 0, __v: 0 },
      },
    ]);
}

export {getCategories}