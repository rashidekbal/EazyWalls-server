import { connect } from "node:http2"
import user, { UserInterface } from "../model/user.js"
import userModel from "../model/user.js"
import { profile } from "node:console"
import connectDB from "../db/connection.js"
class UserRepo{
 createUser=async(user:Omit<UserInterface,"_id">)=>{
    await connectDB();
   return  userModel.create({
    email:user.email,
    password:user.password,
    username:user.username,
    profile:user.profile,
    profileCloudinaryPublicId:user.profileCloudinaryPublicId
   })

}
  getUser=async(email:string)=>{
    await connectDB();
    return userModel.findOne({"email":email});
}
}
export default UserRepo