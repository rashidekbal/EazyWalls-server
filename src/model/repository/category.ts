import { categoryModel } from "../category.js";
const getCategories=async(page:number)=>{
    return await categoryModel.aggregate([
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
        $project: { wallpaper: 0, _id: 0, createdAt: 0, updatedAt: 0, __v: 0 },
      },
    ]);
}

export {getCategories}