const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  files: [
    {
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
        type: Number,
        required: true
      },
      created: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = Files = mongoose.model("files", fileSchema);
