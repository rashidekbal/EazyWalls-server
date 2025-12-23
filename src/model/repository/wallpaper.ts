import { wallpaperModel } from "../wallpaper.js";
const getWallpapers=async(category:string|null,page:number)=>{
    //page number is taken for pagination;
    if(category){
        return wallpaperModel.find({category});
    }
    return wallpaperModel.find({});

}
export {getWallpapers}