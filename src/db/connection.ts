import mongoose from "mongoose";
const connectDb=async (url:string)=>{
       return await mongoose.connect(url);
}

export default connectDb;