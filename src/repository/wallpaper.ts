import mongoose, { mongo } from "mongoose";
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
const getNonTrendingWallPapers=async()=>{
    return wallpaperModel.find({status:"success",trending:false});
}
const getNonFeaturedWallpapers=async()=>{
    return wallpaperModel.find({status:"success",featured:false});
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
const deleteWallpaper=async(id:string)=>{
    let objectId=mongoose.Types.ObjectId.createFromHexString(id);
   return await wallpaperModel.deleteOne({_id:objectId});
}
const removeTrending=async(id:string)=>{
     let objectId=mongoose.Types.ObjectId.createFromHexString(id);
   return await wallpaperModel.updateOne({_id:objectId},{$set:{trending:false}});

}
const removeFeatured=async(id:string)=>{
     let objectId=mongoose.Types.ObjectId.createFromHexString(id);
   return await wallpaperModel.updateOne({_id:objectId},{$set:{featured:false}});

}
const AddTrending=async(id:string)=>{
     let objectId=mongoose.Types.ObjectId.createFromHexString(id);
   return await wallpaperModel.updateOne({_id:objectId},{$set:{trending:true,featured:false}});

}
const addFeatured=async(id:string)=>{
     let objectId=mongoose.Types.ObjectId.createFromHexString(id);
   return await wallpaperModel.updateOne({_id:objectId},{$set:{featured:true,trending:false}});

}
export {getWallpapers,getWallpapersOfType,deleteWallpaper,removeTrending,getNonFeaturedWallpapers,getNonTrendingWallPapers,AddTrending,addFeatured,removeFeatured}