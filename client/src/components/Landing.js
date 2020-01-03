import React, { Component } from "react";
import upload from "../utils/img/upload.png";
import InputGroup from "./common/InputField";
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import { uploadFile } from "../upload/UploadFile";
import Proptypes from "prop-types";
import UploadForm from "./UploadForm";
import Uploading from "./Uploading";

class Landing extends Component {
  state = {
    contentState: "UploadForm",
    uploadFormData: null,
    uploadingDetails: null
  };

  // Function to show the before and while uploading content
  showUploadDetails() {
    switch (this.state.contentState) {
      case "UploadForm":
        return (
          <UploadForm
            uploading={uploadingDetails => {
              // console.log('Details collected', uploadingDetails)
              this.setState({
                uploadingDetails: uploadingDetails
              });
            }}
            onUpload={uploadFormData => {
              // console.log("Form data to upload", uploadFormData);
              this.setState({
                uploadFormData: uploadFormData,
                contentState: "Uploading"
              });
            }}
          />
        );
      case "Uploading":
        return (
          <Uploading
            uploadFormData={this.state.uploadFormData}
            uploadingDetails={this.state.uploadingDetails}
          />
        );
      default:
        return (
          <UploadForm
            uploading={uploadingDetails => {
              // console.log('Details collected', uploadingDetails)
              this.setState({
                uploadingDetails: uploadingDetails
              });
            }}
            onUpload={uploadFormData => {
              // console.log("Form data to upload", uploadFormData);
              this.setState({
                uploadFormData: uploadFormData,
                contentState: "Uploading"
              });
            }}
          />
        );
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="row">
          <div className="col-md-6 landing_container_left">
            {this.showUploadDetails()}
          </div>
          <div className="col-md-6 landing_container_right" />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  onUpload: Proptypes.func
};

export default Landing;
