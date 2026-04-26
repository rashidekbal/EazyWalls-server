import mongoose, { mongo } from "mongoose";
import serviceErrorType from "../common/ErrorEnum.js";
import serviceError from "../common/ServiceError.js";
import { isValidEmail } from "../utils/Regex.js";
import favourite, { favouriteInterface } from "../model/favourite.js";
import { db_record_limit } from "../common/constants.js";
import connectDB from "../db/connection.js";
import wallpaper from "../model/wallpaper.js";

export default class FavouriteRepo {
  addFavourite = async (data: favouriteInterface) => {
    await connectDB();
    return favourite.insertOne({
      email: data.email,
      wallpaperId: data.wallpaperId,
    });
  };
  removeFavourite = async (data: favouriteInterface) => {
    await connectDB();
    return favourite.deleteOne({
      email: data.email,
      wallpaperId: data.wallpaperId,
    });
  };
  getFavourite = async (email: string, page: number = 1) => {
    await connectDB();
    if (page < 1) page = 1;
    //use aggregarte farmework for getting wallpaper into with join from favourite wallpaper wallpaper id
    return favourite.aggregate([{ $match: { email: email } },{$lookup:{
        from:"wallpapers",
        localField:"wallpaperId",
        foreignField:"_id",
        as:"wallpapers",
    }},
    {
    $sort: {
      "wallpapers.updatedAt": -1,
    },
  },
    {$project:{
        "wallpapers":1
    }}
    ]).limit(db_record_limit).skip((page-1)*db_record_limit);
  };
}
