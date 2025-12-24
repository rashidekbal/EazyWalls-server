import mongoose from "mongoose";
const wallpaperSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    author: {
        type: String,
        required: true
    },
    previewUrl: {
        type: String,
        required: false
    },
    originalUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["uploading", "success", "failed"],
        default: "uploading"
    },
    featured: {
        type: Boolean,
        default: false
    },
    trending: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const wallpaperModel = mongoose.model("wallpaper", wallpaperSchema);
export { wallpaperModel };
