import connectDB from "../db/connection.js";
import reportModel, { reportInterface } from "../model/report.js";

const addReport=async(data:reportInterface)=>{
    await connectDB();
    return reportModel.insertOne({
        email:data.email,
        wallpaperId:data.wallpaperId,
        issue:data.issue
    })
}
export default addReport