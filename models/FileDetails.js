const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileDetailsSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  files: []
});

module.exports = FileDetails = mongoose.model(
  "file-details",
  FileDetailsSchema
);
