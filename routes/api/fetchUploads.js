const express = require("express");
const router = express.Router();
const FileDetails = require("../../models/FileDetails");

// @route GET /api/fetchUploads/
// @description Get details of all uploads by user id
// @access Private
router.post("/retrieve", (req, res) => {
  FileDetails.find({
    user: req.body.user
  })
    .then(data => {
      // console.log(data)
      return res.status(200).json(data);
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
