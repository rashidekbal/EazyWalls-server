import mongoose from "mongoose";
export interface reportInterface{
    _id?:mongoose.Types.ObjectId,
    email:string,
    wallpaperId:mongoose.Types.ObjectId;
    issue:string
}
const reportIssueSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    wallpaperId:{type:mongoose.Types.ObjectId,
        require:true
    },
    issue:{
        type:String,
        require:true
    }

})

export default mongoose.models.reportModel||mongoose.model("reportModel",reportIssueSchema);