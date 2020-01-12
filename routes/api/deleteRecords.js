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

// @route POST /api/deleteRecords
// @description Delete a specific record from both db and s3 bucket
// @access Private
router.post("/", (req, res) => {
  FilesDetails.find({
    user: req.body.user
  })
    .then(profile => {
      console.log(profile);
      let ctr;
      const files = profile[0].files;
      // Check for the index of the element to be removed
      // when found, splice it from the array and update the model
      Object.keys(files).map(key => {
        if (files[key].location === req.body.location) {
          ctr = key;
        }
      });
      // Remove the ctr element from the list of files
      files.splice(ctr, 1);
      // create an object with the updated data
      const newFileDetails = {
        user: req.body.user,
        from: profile.user,
        to: profile.to,
        message: profile.message,
        files: files
      };
      // Update the model
      FileDetails.findOneAndUpdate(
        {
          user: req.body.user
        },
        {
          $set: newFileDetails
        },
        {
          new: true
        }
      )
        .then(details => {
          console.log(req.body.fileName);
          let params = { Bucket: "vortex-fileapp", Key: req.body.fileName };
          // Delete the file with name as fileName
          s3.deleteObject(params, (err, data) => {
            if (data) {
              console.log("File deleted successfully");
            } else {
              console.log("Check if you have sufficient permissions : " + err);
            }
          });
          // Returns the database data back
          return res.status(200).json(details);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
