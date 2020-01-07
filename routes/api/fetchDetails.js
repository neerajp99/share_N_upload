const express = require("express");
const router = express.Router();
const FileDetails = require("../../models/FileDetails");

// @route GET /api/appRoute/
// @description Get
// @access Public
router.get("/:id", (req, res) => {
  FileDetails.findOne({
    _id: req.params.id
  })
    .then(data => {
      console.log(data)
      return res.status(200).json(data);
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
