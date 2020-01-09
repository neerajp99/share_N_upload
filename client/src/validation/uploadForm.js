const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUploadForm(data) {
  // Initialise errors as an empty object
  let errors = {};
  // check if the from string is empty
  data.from = !isEmpty(data.from) ? data.from : "";
  data.sendTo = !isEmpty(data.sendTo) ? data.sendTo : "";

  //#######################################
  // Using validator to validate the fields
  //#######################################

  // Check if sender's email is invalid
  if (!Validator.isEmail(data.from)) {
    errors.from = "* Sender's email is invalid!";
  }

  // Check if receiver's email is invalid
  if (!Validator.isEmail(data.sendTo)) {
    errors.sendTo = "* Receiver's email is invalid!";
  }

  // Check if "from" field is empty
  if (Validator.isEmpty(data.from)) {
    errors.from = "* Sender's email is empty!";
  }

  // Check if "sendTo" field is empty
  if (Validator.isEmpty(data.sendTo)) {
    errors.sendTo = "* Receiver's email is empty!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
