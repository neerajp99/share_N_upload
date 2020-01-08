import React, { Component } from "react";
import Landing from "./Landing";
import upload from "../utils/img/upload.png";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

class Uploading extends Component {
  state = {
    completed: 0,
    uploadFormData: null,
    filesLength: 0,
    uploadingDetails: null,
    totalData: 0,
    dataLoaded: 0,
    newTime: new Date(),
    currentSpeed: 0
  };

  // getDerivedStateFromProps lifecycle method to update state
  static getDerivedStateFromProps(nextProps, prevState) {
    const { uploadFormData, uploadingDetails } = nextProps;
    // console.log("UPLOADDD", uploadingDetails);
    let currentData;
    if (uploadingDetails !== null) {
      if (uploadingDetails.type === "onUploadProgress") {
        currentData = uploadingDetails;
      } else {
        currentData = {
          payload: {
            total: prevState.totalData,
            loaded: prevState.dataLoaded,
            completed: prevState.completed
          }
        };
      }
    }
    // console.log(uploadingDetails);

    return {
      uploadFormData: nextProps.uploadFormData,
      uploadingDetails: nextProps.uploadingDetails,
      currentSpeed:
        prevState.dataLoaded !== 0
          ? (prevState.dataLoaded / (new Date() - prevState.newTime)).toFixed(1)
          : 0,
      totalData: currentData !== undefined ? currentData.payload.total : 0,
      dataLoaded: currentData !== undefined ? currentData.payload.loaded : 0,
      completed:
        currentData !== undefined
          ? (currentData.payload.loaded / currentData.payload.total) * 100
          : 0
    };
  }

  render() {
    return (
      <div className="uploading_form">
        <img src={upload} className="image_upload" />
        <div className="center_items_uploading">
          <h5 className="uploading_heading">UPLOADING...</h5>
          <span>
            <h6 className="uploading_subheading">
              Uploading {this.state.uploadFormData.files.length} files.
            </h6>
            <LinearProgress
              variant="determinate"
              value={this.state.completed}
            />

            <div className="uploading_downcontent">
              <div className="uploading_downcontent_left">
                {(this.state.dataLoaded / 1000).toFixed(1)} Kb /{" "}
                {(this.state.totalData / 1000).toFixed(1)} Kb
              </div>
              <div className="uploading_downcontent_right">
                {this.state.currentSpeed}K/s
              </div>
            </div>
            <button
              className="uploading_cancel_button btn btn-primary btn-lg btn-block"
              type="submit"
              onClick={() => {
                if (this.props.uploadCancel) {
                  this.props.uploadCancel(true);
                }
              }}
            >
              CANCEL
            </button>
          </span>
        </div>
      </div>
    );
  }
}

// Adding prop-types
Uploading.propTypes = {
  uploadFormData: PropTypes.object,
  uploadCancel: PropTypes.func,
  uploadingDetails: PropTypes.object
};

export default Uploading;
