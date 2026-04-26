import mongoose from "mongoose";
export interface favouriteInterface{
    _id?:mongoose.Types.ObjectId,
    email:string,
    wallpaperId:mongoose.Types.ObjectId,
}


const favouriteSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    wallpaperId:{
        type:mongoose.Types.ObjectId,
        require:true,
    }


},{timestamps:true});


export default mongoose.models.favourite||mongoose.model("favourite",favouriteSchema);