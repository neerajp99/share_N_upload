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
    contentState: "UploadForm"
  };

  // Function to show the before and while uploading content
  showUploadDetails() {
    switch (this.state.contentState) {
      case "UploadForm":
        return (
          <UploadForm
            onUpload={uploadForm => {
              console.log("Form data to upload", uploadForm);
              this.setState({
                contentState: "Uploading"
              });
            }}
          />
        );
      case "Uploading":
        return <Uploading />;
      default:
        return (
          <UploadForm
            onUpload={uploadForm => {
              console.log("Form data to upload", uploadForm);
              this.setState({
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
