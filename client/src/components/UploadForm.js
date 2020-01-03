import React, { Component } from "react";
import upload from "../utils/img/upload.png";
import InputGroup from "./common/InputField";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import { uploadFile } from "../upload/UploadFile";

class UploadForm extends Component {
  state = {
    sendTo: "",
    from: "",
    message: "",
    files: []
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

    // Return back the state to the parent component
    if (this.props.onUpload) {
      this.props.onUpload(this.state);
    }
    // When dubmit form is called, initiate the uploadFile method
    uploadFile(this.state, callback => {
      console.log("Upload callback", callback);
    });
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
          </div>
          <div className="main_form_bottom">
            <InputGroup
              placeholder="Send To"
              name="sendTo"
              value={this.state.sendTo}
              onChange={this.onChange}
            />
            <InputGroup
              placeholder="Send To"
              name="from"
              value={this.state.from}
              onChange={this.onChange}
            />
            <TextAreaFieldGroup
              placeholder="What's your message?"
              name="message"
              value={this.state.message}
              onChange={this.onChange}
              info="Tell us about your work position."
            />
            <button
              className="send_button btn btn-primary btn-lg btn-block"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Prop-types goes here
UploadForm.propTypes = {
  onUpload: PropTypes.func
};

export default UploadForm;
