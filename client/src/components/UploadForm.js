import React, { Component } from "react";
import upload from "../utils/img/upload.png";
import InputGroup from "./common/InputField";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import { uploadFile } from "../upload/UploadFile";
import shortid from "shortid";
import { connect } from "react-redux";

// Bring in upload form validation
import validateUploadForm from "../validation/uploadForm";

class UploadForm extends Component {
  state = {
    sendTo: "",
    from: "",
    message: "",
    files: [],
    user: this.props.auth.user.id,
    fromError: null,
    sendToError: null,
    fileError: null
  };

  // lifecycle Method
  componentDidMount() {
    // console.log('STATE', this.state)
  }

  // On change method to change the state
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // On Submit method to submit the form
  onSubmit = event => {
    event.preventDefault();
    // Form content
    const error = {};
    const formContent = {
      from: event.target.from.value,
      sendTo: event.target.sendTo.value,
      message: event.target.message.value
    };

    const { errors, isValid } = validateUploadForm(formContent);
    const isEmpty = require("../validation/is-empty");
    // if there are form validation errors
    if (!isValid || isEmpty(this.state.files)) {
      console.log(this.state.files.length);
      if (this.state.files.length > 0) {
        //Change the state with the errors
        this.setState({
          fromError: errors.from,
          sendToError: errors.sendTo,
          fileError: null
        });
      } else {
        this.setState({
          fromError: errors.from,
          sendToError: errors.sendTo,
          fileError: "* Please upload file(s) to proceed."
        });
      }
    } else {
      // Return back the state to the parent component
      if (this.props.onUpload) {
        // console.log(this.state)
        this.props.onUpload(this.state);
      }
      console.log(this.state);

      // When dubmit form is called, initiate the uploadFile method
      uploadFile(this.state, callback => {
        // console.log("Upload callback", callback);
        if (this.props.uploading) {
          this.props.uploading(callback);
        }
      });
    }
  };

  // Method when file is added
  onChangeFile = event => {
    let file = this.state.files;
    const files = event.target.files;

    Object.keys(files).forEach(key => {
      // console.log(files[key]);
      file.push(files[key]);
    });

    this.setState({
      files: file
    });
    // console.log(this.state.files);
  };

  // Delete items on click
  onDeleteItem = key => {
    console.log(key);
    let { files } = this.state;
    files.splice(key, 1);
    this.setState({
      files: files
    });
    console.log(this.state);
  };
  render() {
    const { fileError } = this.state;
    const items = Object.keys(this.state.files).map((key, index) => (
      <div className="upload_files_selected_content" key={key}>
        <div className="upload_files_selected_content_name">
          {this.state.files[key].name}
        </div>
        <div className="upload_files_selected_content_remove">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => this.onDeleteItem(key)}
          />
        </div>
      </div>
    ));
    return (
      <div className="uploadForm">
        <form className="landing_form" onSubmit={this.onSubmit}>
          <div className="main_form_top">
            <div className="upload_files_selected">{items}</div>
            <div className="input_file_div">
              <label htmlFor={"input-file"}>
                <input
                  type="file"
                  multiple={true}
                  id={"input-file"}
                  className="input-file"
                  onChange={this.onChangeFile}
                />
                <i className="fa fa-upload" aria-hidden="true" />
                {this.state.files.length == 0 && (
                  <span className="man_form_top_file_upload">
                    Upload Files Here
                  </span>
                )}
                {this.state.files.length > 0 && (
                  <span className="man_form_top_file_upload">
                    Add More Files
                  </span>
                )}
              </label>
            </div>
            {this.state.fileError !== null && (
              <small className="form-error-text text-left">
                {this.state.fileError}
              </small>
            )}
          </div>
          <div className="main_form_bottom">
            <InputGroup
              placeholder="Send To"
              name="sendTo"
              value={this.state.sendTo}
              onChange={this.onChange}
              label="Receiver's Email"
              error={this.state.sendToError}
              id={this.state.errorCss}
            />
            <InputGroup
              placeholder="From"
              name="from"
              value={this.state.from}
              onChange={this.onChange}
              label="Sender's Email"
              error={this.state.fromError}
            />
            <TextAreaFieldGroup
              placeholder="What's your message?"
              name="message"
              value={this.state.message}
              onChange={this.onChange}
              info="Message"
            />
            <button
              className="send_button btn btn-primary btn-lg btn-block"
              type="submit"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Prop-types goes here
UploadForm.propTypes = {
  onUpload: PropTypes.func,
  uploading: PropTypes.func,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(UploadForm);
