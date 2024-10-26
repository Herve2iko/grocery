const multer = require("multer");
const Path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"./uploads/categories")
    },
    filename: function(req,file,cb) {
        cb(null,Date.now()+"_"+file.originalname);
    }
});

const fileFilter = (req,file,callback)=>{
    const acceptableFormat = [".png",".jpg",",jpeg"]
    if (!acceptableFormat.includes(Path.extname(file.originalname))) {
        return callback(new Error("Only .png .jpg .jpeg format are allowed"))
    }
    const fileSize= parseInt(req.headers["content-length"]);
    if (fileSize>1048576) {
        return callback(new Error("Only file with size greater than 10Mb are not allowed"));
    }
    callback(null,true)
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    fileSize:1048576 
});
module.exports = upload.single("image");