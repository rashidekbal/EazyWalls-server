import mongoose, { ObjectId } from "mongoose";
interface Wallpaper{
    _id:mongoose.Types.ObjectId,
    category:string,
    tags:string[],
    author:string,
    previewUrl:string,
    originalUrl:string,
    CreatedTimeStamp:string,
    UpdateTimeStamp:string,
    featured:boolean,
    trending:boolean,
    height:number,
    width:number,
    public_id?:string

}
const wallpaperSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:false
    },
    author:{
        type:String,
        required:true
    },
    previewUrl:{
        type:String,
        required:false
    },
    originalUrl:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["uploading","success","failed"],
        default :"uploading"
    },
    featured:{
        type:Boolean,
        default:false
    },
    trending:{
        type:Boolean,
        default:false
    },
    height:{
        type:Number,
        required:true
    },
    width:{
        type:Number,
        required:true
    },
    public_id:{
        type:String,
        required:false
    }
    
},{timestamps:true});
const wallpaperModel=mongoose.model("wallpaper",wallpaperSchema);
export {wallpaperModel,Wallpaper}