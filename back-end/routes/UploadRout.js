const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifeir = require('streamifier')

require('dotenv').config()
const router = express.Router();

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//multer setup using memory storag
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ msg: "No file uploaded" })
        }

        //function to handle the stream upload to cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

                //use streamifeir to conver file buffer to stream
                streamifeir.createReadStream(fileBuffer).pipe(stream)
            });
        };

        //call the function
        const result = await streamUpload(req.file.buffer);
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;