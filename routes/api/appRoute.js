const express = require("express");
const router = express.Router();
const { version } = require("../../package.json");

// import multer for storage
const multer = require("multer");
const path = require("path");

//Multer storage directory
const storageDirectory = path.join(__dirname, "..", "storage");

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
const upload = multer({ storageDirectory: storageDirectory });

// @route GET /api/appRoute/
// @description Get
// @acess Public
router.get("/", (req, res) => {
  // console.log(req.app.get('upload'))
  return res.status(200).json({
    version: version
  });
});

// @route POST /api/appRoute/
// @description Post
// @acess Public
router.post("/api/upload", upload.array("files"), function(req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log("Received files", req.files);
  return res.status(200).json("It works");
});

module.exports = router;
