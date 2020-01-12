import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

class FileSent extends Component {
  state = {
    redirect: false,
    id: null
  };
  render() {
    if (this.state.redirect === true) {
      return <Redirect to={`emailSent/${this.state.id}`} />;
    }

    // console.log(this.props.uploadFormData);
    return (
      <div className="fileSent">
        <div className="fileSent_top">
          <i className="fa fa-check-circle sent-icon" />
        </div>
        <div className="fileSent_bottom">
          <h4 className="fileSent_heading">Upload done!</h4>
          <p className="fileSent_para">
            Files have been updated successfully. You can view the link or share
            it via email. The link expires in 30 days.
          </p>
          <div className="fileSent_buttons">
            <Link
              className="fileSent_shared_link"
              to={`/api/shared/${this.props.uploadFormData.payload._id}`}
            >
              <button className="fileSent_buttons_back btn btn-primary btn-lg btn-block">
                VIEW FILE
              </button>
            </Link>
            <button
              className="fileSent_buttons_back btn btn-primary btn-lg btn-block"
              onClick={() => {
                axios
                  .post("api/appRoute/sendEmail", this.props.uploadFormData)
                  .then(data => {
                    // console.log(data);
                    if (data) {
                      this.setState({
                        redirect: true,
                        id: data.data.messageId
                      });
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}
            >
              SHARE VIA EMAIL
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

export default withRouter(FileSent);
