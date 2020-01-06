import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class FileSent extends Component {
  render() {
    console.log(this.props.uploadFormData);
    return (
      <div className="fileSent">
        <div className="fileSent_top">llala</div>
        <div className="fileSent_bottom">
          <h4 className="fileSent_heading">Files sent!</h4>
          <p className="fileSent_para">
            An email with the download link has been sent to{" "}
            {this.props.uploadFormData.sendTo}. The link will expire in 30 days.
          </p>
          <div className="fileSent_buttons">
            <button className="fileSent_buttons_back btn btn-primary btn-lg btn-block">
              <Link
                className="fileSent_shared_link"
                to={`/shared/${this.props.uploadFormData.payload._id}`}
              >
                VIEW FILE
              </Link>
            </button>
            <button
              className="fileSent_buttons_noback btn btn-decondary btn-lg btn-block"
              onClick={() => {
                if (this.props.goToUpload) {
                  this.props.goToUpload("true");
                }
              }}
            >
              SEND ANOTHER FILE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FileSent.propTypes = {
  goToUpload: PropTypes.func,
  uploadFormData: PropTypes.object
};

export default FileSent;
