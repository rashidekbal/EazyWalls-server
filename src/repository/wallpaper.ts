import { Wallpapertype } from "../common/enum.js";
import { wallpaperModel } from "../model/wallpaper.js";
const getWallpapers=async(category:string|null,page:number)=>{
    //page number is taken for pagination;
    if(category){
        return wallpaperModel.aggregate([
    {$match:{
        status:"success",
        category
    }}
])
    }
    return wallpaperModel.find({status:"success"});

}
const getWallpapersOfType=async(wallpaperType:Wallpapertype)=>{
    if(wallpaperType==="FEATURED"){
        return wallpaperModel.aggregate([
    {$match:{
        status:"success",
        featured:true
    }}]);
    }
    return wallpaperModel.aggregate([
    {$match:{
        status:"success",
        trending:true
    }}]);

}
export {getWallpapers,getWallpapersOfType}