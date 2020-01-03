import React, { Component } from "react";
import Landing from "./Landing";
import upload from "../utils/img/upload.png";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

class Uploading extends Component {
  state = {
    completed: 10,
    uploadFormData: null
  };

  // getDerivedStateFromProps lifecycle method to update state
  static getDerivedStateFromProps(nextProps, prevState) {
    const uploadFormData = nextProps;
    return {
      uploadFormData: nextProps
    };
  }

  render() {
    console.log(this.state.uploadFormData)
    return (
      <div className="uploading_form">
        <img src={upload} className="image_upload" />
        <div className="center_items_uploading">
          <h5 className="uploading_heading">UPLOADING...</h5>
          <span>
            <h6 className="uploading_subheading">Uploading 4 files.</h6>
            <LinearProgress
              variant="determinate"
              value={this.state.completed}
            />

            <div className="uploading_downcontent">
              <div className="uploading_downcontent_left">45K/134K</div>
              <div className="uploading_downcontent_right">20K/s</div>
            </div>
            <button
              className="uploading_cancel_button btn btn-primary btn-lg btn-block"
              type="submit"
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
  uploadFormData: PropTypes.object
};

export default Uploading;
