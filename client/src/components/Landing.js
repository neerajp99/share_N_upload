import React, { Component } from "react";
import upload from "../utils/img/upload.png";
import InputGroup from "./common/InputField";
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import { uploadFile } from "../upload/UploadFile";
import Proptypes from "prop-types";
import UploadForm from "./UploadForm";
import Uploading from "./Uploading";
import FileSent from "./Sent";

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
            // When uploads starts to process
            uploading={uploadingDetails => {
              // console.log("Details collected", uploadingDetails);
              let componentState = this.state.coponentState;
              // if the upload status is success, change the contentState and form data state
              if (uploadingDetails.type === "success") {
                this.setState({
                  contentState: "FileSent",
                  uploadFormData: uploadingDetails
                });
              }
              this.setState({
                uploadingDetails: uploadingDetails
              });
            }}
            // When upload is called
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

      // Once file is sent, call FileSent
      case "FileSent":
        return (
          <FileSent
            goToUpload={value => {
              if (value === "true") {
                this.setState({
                  contentState: "UploadForm"
                });
              }
            }}
            // Send the data of uploaded files from the db
            uploadFormData={this.state.uploadFormData}
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
              console.log("Form data to upload", uploadFormData);
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
