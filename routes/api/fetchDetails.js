const express = require("express");
const router = express.Router();
const FilesDetails = require("../../models/FilesDetails");

// @route GET /api/fetchDetails/
// @description Get detils of uploads
// @access Public
router.get("/:id", (req, res) => {
  FilesDetails.findOne({
    _id: req.params.id
  })
    .then(data => {
      // console.log(data)
      return res.status(200).json(data);
    })
    .catch(error => {
      return res.json(error);
    });
});

module.exports = router;
