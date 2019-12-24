const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  file: {
    fileName: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Integer,
      required: true
    },
    created: {
      type: Date,
      default: Date.now()
    }
  }
});

module.exports = Files = mongoose.models("files", fileSchema);
