const express = require("express");
const multer = require("multer");
const path = require("path");

const userController = require("../controllers/userController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(process.cwd(), "profiles");
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e5);
    const fileExtension = path.extname(file.originalname).slice(1);
    const allowedExtensions = [
      "jpg",
      "jpeg",
      "png",
      "png24",
      "gif",
      "tiff",
      "tif",
      "bmp",
      "raw",
      "heic",
    ];
    if (allowedExtensions.includes(fileExtension.toLowerCase())) {
      cb(null, "image_" + uniqueSuffix + "." + fileExtension);
    } else {
      cb(new Error("Invalid file extension"));
    }
  },
});

const upload = multer({ storage: storage });

router.post("/signup", upload.array("file"), userController.signUp);
router.post("/login", userController.login);

module.exports = router;
