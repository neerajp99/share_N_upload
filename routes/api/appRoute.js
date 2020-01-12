const express = require("express");
const router = express.Router();
const { version } = require("../../package.json");

// Import adm-zip
const AdmZip = require("adm-zip");
const archiver = require("archiver");

// Bring in sendEmail method to send email
const sendEmail = require("./sendEmail");

// import multer for storage
const multer = require("multer");
const path = require("path");

// import multer s3 bucket
const multerS3 = require("multer-s3");

// import shortid for random characters for image name
const shortid = require("shortid");

// Bring in File Model
const Files = require("../../models/Files");

// Bring in FileDetails Model
const FileDetails = require("../../models/FileDetails");

//###########################################
// AWS S3 settings STARTS
//###########################################

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

const generatedString = shortid.generate();
// add the multer-s3 method
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "vortex-fileapp",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const filename = `${generatedString}-${file.originalname}`;
      cb(null, filename);
    }
  })
});

//###########################################
// AWS S3 settings ENDS
//###########################################

//################################################
// For storing to local path, uncomment the below
//################################################

// //Multer storage directory
// const storageDirectory = path.join(__dirname, "..", "uploadFiles");
//
// // Multer - File Storage configuration
// // The disk storage engine gives you full control on storing files to disk.
// // For info https://github.com/expressjs/multer#diskstorage
//
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, storageDirectory);
//   },
//   filename: (req, file, cb) => {
//     // returns the extension of a file path.
//     // for more info: https://github.com/expressjs/multer#api
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// // add the destination to multer
// const upload = multer({ storage: storage });

//################################################
// Local Path storage function ends
//################################################

//*************************  ROUTE GOES HERE  *****************************

// @route GET /api/appRoute/
// @description Get
// @access Public
router.get("/", (req, res) => {
  // console.log(req.app.get('upload'))
  return res.status(200).json({
    version: version
  });
});

//*************************  ROUTE GOES HERE  *****************************

// @route POST /api/appRoute/
// @description Post
// @access Public
router.post("/upload", upload.array("files"), (req, res, next) => {
  // console.log(files)
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  let files = [];
  if (req.files) {
    // const newFileModel = new Files();
    for (let i = 0; i < req.files.length; i++) {
      const newFiles = {
        fileName: req.files[i].key,
        originalName: req.files[i].originalname,
        mimetype: req.files[i].mimetype,
        size: req.files[i].size,
        location: req.files[i].location,
        etag: req.files[i].etag
      };
      // newFileModel.files.unshift(newFiles);
      files.push(newFiles);
    }
    // newFileModel
    //   .save()
    //   .then(file => {
    //     // console.log(file);
    //     return res.json(file);
    //   })
    //   .catch(error => {
    //     return res.json(error);
    //   });
  }

  if (req.body && files.length > 0) {
    // Adding File Details to the database
    let user;
    if (req.body.user === "undefined") {
      user = generatedString;
    } else {
      user = req.body.user;
    }
    // Initialise a new empty file array
    const newFiles = [];

    // CHeck if user has uploaded something in the past
    FileDetails.find({
      user
    })
      .then(profile => {
        if (profile.length > 0) {
          // if user is already present, add all the files to the newly created array
          Object.keys(profile[0].files).map(key => {
            newFiles.push(profile[0].files[key]);
          });
          // Push the new files to the current file array
          Object.keys(files).map(key => {
            newFiles.push(files[key]);
          });
          // new object with the new deatils to add
          const newFileDetails = {
            from: req.body.from,
            to: req.body.sendTo,
            message: req.body.message,
            files: newFiles,
            user: user
          };

          // find and replace in the moongodb
          FileDetails.findOneAndUpdate(
            {
              user: user
            },
            {
              $set: newFileDetails
            },
            {
              new: true
            }
          )
            .then(details => {
              return res.status(200).json(details);
            })
            .catch(error => {
              res.json(error);
            });
        }
        // if the user is not present, create one
        else {
          console.log("waah mdiji");
          const newFileDetails = new FileDetails({
            from: req.body.from,
            to: req.body.sendTo,
            message: req.body.message,
            files: files,
            user: user
          });
          newFileDetails
            .save()
            .then(details => {
              // console.log("DETAILS", details);
              res.status(200).json(details);
            })
            .catch(error => {
              res.json(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});

//*************************  ROUTE GOES HERE  *****************************

// @route POST /api/appRoute/sendEmail
// @description Sending email with the files link
// @access Public

router.post("/sendEmail", (req, res) => {
  sendEmail(req.body.payload);
});

//*************************  ROUTE GOES HERE  *****************************

// @route GET /api/appRoute/download/:filename
// @description Transfering/Downloading the file at path as an “attachment”
// @access Public
router.get("/download/:filename", (req, res) => {
  //#################################################################
  // **STARTS** Downloading a single file from the file directory
  //#################################################################
  // const filePath = path.join(storageDirectory, req.params.filename);
  // return res.download(filePath, req.params.filename, error => {
  //   if (error) {
  //     return res.status(400).json(error);
  //   } else {
  //     console.log("File is downloaded!");
  //   }
  // });
  //#################################################################
  // **END** Downloading a single file from the file directory
  //#################################################################

  //#################################################################
  // **STARTS** Downloading a single file from the S3 bucket
  //#################################################################

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
//#################################################################
// **ENDS** Downloading a single file from the S3 bucket
//#################################################################

//*************************  ROUTE GOES HERE  *****************************

// @route GET /api/appRoute/download/all/:uploadId
// @description Download all files
// @access Public
router.get("/download/all/:uploadId", (req, res) => {
  FileDetails.findOne({
    _id: req.params.uploadId
  })
    .then(data => {
      // Initialize new AdmZip for zip data compression (use wither adm zip or archiver)
      // const zip = new AdmZip();
      const zip = archiver("zip");

      //*************************
      // Type 1
      res.attachment(`${req.params.uploadId}.zip`);
      zip.pipe(res);
      //*************************
      // Looping over and adding each file to the AdmZip object
      for (let i = 0; i < data.files.length; i++) {
        //*************************
        // // Add file path to the filePath variable (for downloading on local server)
        // const filePath = path.join(storageDirectory, data.files[i].fileName);
        // zip.addLocalFile(filePath);
        //*************************

        // Add file path to the filePath variable (for downloading from aws s3 server)
        // file name to download
        const fileName = data.files[i].fileName;
        // Create an parameters object to pass to s3
        const params = {
          Bucket: "vortex-fileapp",
          Key: fileName
        };
        // Create a readable stream from the s3 bucket object
        const fileObject = s3.getObject(params).createReadStream();
        zip.append(fileObject, { name: fileName });
      }

      // // Type 2 (use either 1 or 2)
      // const downloadName = `${req.params.uploadId}.zip`;
      // // Create a buffer data for the files
      // const zipData = zip.toBuffer();
      // // Set headers for HTTP content disposition
      // res.set(`Content-Type`, `application/octet-stream`);
      // res.set(`Content-Disposition`, `attachment; filename = ${downloadName} `);
      // res.set(`Content-Length`, zipData.length);
      // // zip.writeZip(downloadName)
      // res.status(200).send(zipData);

      zip.finalize();
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
