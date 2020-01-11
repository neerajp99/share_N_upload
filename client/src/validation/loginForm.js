const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginForm(data) {
  // Initialise errors as an empty object
  let errors = {};
  // check if the from string is empty
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //#######################################
  // Using validator to validate the fields
  //#######################################

  // //check if email is invalid
  if (!Validator.isEmail(data.email)) {
    errors.email = "* Email is invalid";
  }
  //check if email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "* Email field is required";
  }
  //check if password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "* Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
