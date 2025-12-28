import mongoose from "mongoose";
interface Category{
    _id:string,
    title:string,
    previewUrl:string,
    createdTimeStamp:string,
    lastUpdatedTimeStamp:string,
    public_id?:string

};
const categorySchmea=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    previewUrl:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:false
    },
    status:{
        type:String,
        enum:["uploading","success","failed"],
        default:"uploading"
    }
},{timestamps:true});


export default mongoose.models.category||mongoose.model("category",categorySchmea)
