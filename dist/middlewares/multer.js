import path from "path";
import multer from "multer";
//upload to disk
const storageondisk = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/public/temp");
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});
const uploadFile = multer({ storage: storageondisk });
export default uploadFile;
