import mongoose from "mongoose";
import FavouriteRepo from "../repository/favourite.repo.js";
import { isValidEmail } from "../utils/Regex.js";
import addReport from "../repository/report.repo.js";

export default class WallpaperService {
  favouriteRepo: FavouriteRepo;
  constructor(favRepo: FavouriteRepo) {
    this.favouriteRepo = favRepo;
  }

  addFavourite = (email: string, wallpaperId: string) => {
    if (!isValidEmail(email)) throw "invalid email";
    if (!wallpaperId) throw "invalid wallpaperId";
    const wallpaperObjectId =
      mongoose.Types.ObjectId.createFromHexString(wallpaperId);
    if (!mongoose.Types.ObjectId.isValid(wallpaperObjectId))
      throw "invalid wallpaperId";
    return this.favouriteRepo.addFavourite({
      email,
      wallpaperId: wallpaperObjectId,
    });
  };
  removeFavourite = (email: string, wallpaperId: string) => {
    if (!isValidEmail(email)) throw "invalid email";
    if (!wallpaperId) throw "invalid wallpaperId";
    const wallpaperObjectId =
      mongoose.Types.ObjectId.createFromHexString(wallpaperId);
    if (!mongoose.Types.ObjectId.isValid(wallpaperObjectId))
      throw "invalid wallpaperId";
    return this.favouriteRepo.removeFavourite({
      email,
      wallpaperId: wallpaperObjectId,
    });
  };

  getFavourites=(email:string,page:number=1)=>{
    if(page<1)page=1;
    if (!isValidEmail(email)) throw "invalid email";
    return this.favouriteRepo.getFavourite(email,page);

  }
  reportWallaperIssue=(email:string,wallpaperId:string,issue:string)=>{
     if (!isValidEmail(email)) throw "invalid email";
    if (!wallpaperId) throw "invalid wallpaperId";
    if(issue.length>150)throw "too big issue must be of 150 letters";
    const wallpaperObjectId =
      mongoose.Types.ObjectId.createFromHexString(wallpaperId);
    if (!mongoose.Types.ObjectId.isValid(wallpaperObjectId))
      throw "invalid wallpaperId";
    return addReport({email,wallpaperId:wallpaperObjectId,issue});

  }
}
