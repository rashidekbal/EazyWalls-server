import mongoose, { mongo } from "mongoose";
 interface UserInterface{
_id:string,
email:String,
password:String,
username:String,
profile:String,
profileCloudinaryPublicId:String
}
const userScehma=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
    ,
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    profile:{
        type:String,
    },
    profileCloudinaryPublicId:{
        type:String
    }

},{timestamps:true})
export default mongoose.models.user||mongoose.model("user",userScehma)
export {UserInterface}