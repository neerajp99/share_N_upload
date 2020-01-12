const express = require("express");
const router = express.Router();
const FilesDetails = require("../../models/FilesDetails");

// Bring in amazon web services sdk
const AWS = require("aws-sdk");

// Set properties using the update method
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: ""
});

// Set the region
// AWS.config.region = 'us-east-2'
AWS.config.update({ region: "us-east-2" });

// Create S3 service object
let s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// ********************** ROUTE GOES HERE **********************

// @route POST /api/downloadRecords
// @description Download a specific record from s3 bucket
// @access Private
router.get("/:filename", (req, res) => {
  // file name to download
  const fileName = req.params.filename;

  // Add content disposition header for attachment in HTTP
  res.attachment(fileName);

  // Create an parameters object to pass to s3
  const params = {
    Bucket: "vortex-fileapp",
    Key: fileName
  };

  // Create a readable stream from the s3 bucket object
  const fileObject = s3.getObject(params).createReadStream();
  // Pipe the readstream to the response object (for the client)
  fileObject.pipe(res);
});

module.exports = router;
