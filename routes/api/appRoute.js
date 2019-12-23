const express = require("express");
const router = express.Router();
const { version } = require("../../package.json");

// import multer for storage
const multer = require("multer");
const path = require("path");

//Multer storage directory
const storageDirectory = path.join(__dirname, "..", "uploadFiles");

// Multer - File Storage configuration
// The disk storage engine gives you full control on storing files to disk.
// For info https://github.com/expressjs/multer#diskstorage

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, storageDirectory);
  },
  filename: (req, file, cb) => {
    // returns the extension of a file path.
    // for more info: https://github.com/expressjs/multer#api
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
// add the destination to multer
const upload = multer({ storages: storage });

// @route GET /api/appRoute/
// @description Get
// @access Public
router.get("/", (req, res) => {
  // console.log(req.app.get('upload'))
  return res.status(200).json({
    version: version
  });
});

// @route POST /api/appRoute/
// @description Post
// @access Public
router.post("/upload", upload.array("files"), (req, res, next) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log("Received files", req.files);
  return res.status(200).json({
    files: req.files
  });
});

// @route GET /api/appRoute/
// @description Transfering/Downloading the file at path as an “attachment”
// @access Public
router.get("/download/:filename", (req, res) => {
  const filePath = path.join(storageDirectory, req.params.filename);
  return res.download(filePath, req.params.filename, error => {
    if (error) {
      return res.status(400).json(error);
    } else {
      console.log("File is downloaded!");
    }
  });
});

module.exports = router;
