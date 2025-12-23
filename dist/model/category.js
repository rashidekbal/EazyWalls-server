import mongoose from "mongoose";
;
const categorySchmea = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    previewUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["uploading", "success", "failed"],
        default: "uploading"
    }
}, { timestamps: true });
const categoryModel = mongoose.model("category", categorySchmea);
export { categoryModel };
