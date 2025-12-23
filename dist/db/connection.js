import mongoose from "mongoose";
const connectDb = async (url) => {
    return await mongoose.connect(url);
};
export default connectDb;
