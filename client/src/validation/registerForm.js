const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterForm(data) {
  // Initialise errors as an empty object
  let errors = {};
  // check if the from string is empty
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //#######################################
  // Using validator to validate the fields
  //#######################################

  //check if name is of less than 2 characters or more than 30 characters
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "* Name must be in between 2 and 30 characters";
  }
  //check if the name field is empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "* Name field is required";
  }
  // //check if email is invalid
  if (!Validator.isEmail(data.email)) {
    errors.email = "* Email is invalid";
  }
  //check if email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "* Email field is required";
  }
  //check if the password has characters in between 6 and 30.
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "* Password should be in between 6 and 30 characters";
  }
  //check if password2 field is empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "* Confirm Password field is required";
  }
  //check if password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "* Password field is required";
  }
  //check if confirm password field is equal to the password
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "* Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
