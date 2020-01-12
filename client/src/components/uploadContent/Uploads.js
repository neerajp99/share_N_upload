import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../Navbar";
import Background from "../../utils/img/cubes.png";

class Uploads extends Component {
  state = {
    files: []
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      const users = {
        user: this.props.auth.user.id
      };
      // Empty file array
      const files = [];

      axios
        .post(`/api/fetchUploads/retrieve`, users)
        .then(data => {
          // console.log(data.data);
          // Add the fetched files to the state
          Object.keys(data.data).map(key => {
            Object.keys(data.data[key].files).map(keyy => {
              files.push(data.data[key].files[keyy]);
            });
          });
        })
        .then(() => {
          this.setState({
            files: files
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // Delete current item from list and s3 bucket

  render() {
    const { files } = this.state;
    // Render all items here
    const items = Object.keys(this.state.files).map(key => (
      <div className="uploads_details_list_item" key={key}>
        <div className="uploads_details_list_item_left">
          {files[key].originalName}
        </div>
        <div
          className="uploads_details_list_item_right_first"
          onClick={() => {
            const data = {
              location: files[key].location,
              user: this.props.auth.user.id,
              fileName: files[key].fileName
            };
            axios
              .post("/api/deleteRecords", data)
              .then(res => {
                window.location.reload();
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          <i className="fa fa-lg fa-trash-o" aria-hidden="true" />
        </div>
        <div className="uploads_details_list_item_right_second">
          <a
            href={`http://localhost:5010/api/downloadRecords/${
              files[key].fileName
            }`}
          >
            <i className="fa fa-lg fa-download" aria-hidden="true" />
          </a>
        </div>
      </div>
    ));
    return (
      <div className="uploads_content">
        <div className="row">
          <div className="col-md-6 landing_container_left">
            <div className="uploads_details container">
              <h1 className="uploads_details_heading">My Uploads</h1>
              <hr className="uploads_details_hr" />
              <div className="uploads_detail">
                <div className="uploads_details_list">{items}</div>
              </div>
            </div>
          </div>
          <div className="col-md-6 landing_container_right">
            <div className="uploads_logo">
              <i className="fa fa-upload uploads_logo_i" aria-hidden="true" />
            </div>
            <Navbar details={"Home"} />
            <h1 className="main_heading">Store and your share data.</h1>
            <p className="main_para">
              Workspace designed to share and store files that matter. Sign In
              or share the files on email.
            </p>
            <button className="main_button">Learn More</button>
            <img src={Background} alt="background" className="bg-back" />
          </div>
        </div>
      </div>
    );
  }
}

// Using prop-types
Uploads.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Uploads);
