const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const CloudinaryStorage = require("multer-storage-cloudinary")
    .CloudinaryStorage;

cloudinary.config({
    api_secret: process.env.CLOUDINARY_SECRET,
    api_key: process.env.CLOUDINARY_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ironhack/helpers",
        allowedFormats: ["jpg", "png"],
    },
});

module.exports = multer({ storage: storage });