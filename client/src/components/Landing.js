import React, { Component } from "react";
import upload from "../utils/img/upload.png";
import InputGroup from "./common/InputField";
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import { uploadFile } from "../upload/UploadFile";
import Proptypes from "prop-types";
import UploadForm from "./UploadForm";
import Uploading from "./Uploading";
import FileSent from "./Sent";
import Navbar from "./Navbar";

class Landing extends Component {
  state = {
    contentState: "UploadForm",
    uploadFormData: null,
    uploadingDetails: null,
    cancel: false
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
              if (this.state.cancel === true) {
                this.setState({
                  uploadFormData: null,
                  uploadingDetails: null
                });
              } else if (
                uploadingDetails.type === "success" &&
                this.state.uploadFormData !== null
              ) {
                this.setState({
                  contentState: "FileSent",
                  uploadFormData: uploadingDetails
                });
              } else {
                this.setState({
                  uploadingDetails: uploadingDetails
                });
              }
            }}
            // When upload is called
            onUpload={uploadFormData => {
              // console.log("Form data to upload", uploadFormData);
              this.setState({
                uploadFormData: uploadFormData,
                contentState: "Uploading"
              });
            }}
            // Cancel the progress of upload
          />
        );
      case "Uploading":
        return (
          <Uploading
            uploadFormData={this.state.uploadFormData}
            uploadingDetails={this.state.uploadingDetails}
            uploadCancel={boolValue => {
              if (boolValue === true) {
                this.setState({
                  uploadFormData: null,
                  uploadingDetails: null,
                  contentState: "UploadForm",
                  cancel: true
                });
              }
            }}
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
    // console.log(__dirname);
    return (
      <div className="landing">
        <div className="row">
          <div className="col-md-6 landing_container_left">
            {this.showUploadDetails()}
          </div>
          <div className="col-md-6 landing_container_right">
            <Navbar details={"Uploads"} />
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  onUpload: Proptypes.func
};

export default Landing;
