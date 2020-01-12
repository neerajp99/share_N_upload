import React, { Component } from "react";
import Navbar from "./Navbar";
import Background from "../utils/img/back.png";

class EmailSent extends Component {
  render() {
    return (
      <div className="email-sent">
        <div className="row">
          <div className="col-md-6 landing_container_left">
            <div className="emailSent-left">
              <i className="fa fa-check-circle emailSent-icon" />
              <h2 className="emailSent-heading">Email has been sent!</h2>
            </div>
          </div>
          <div className="col-md-6 landing_container_right">
            <div className="uploads_logo">
              <i className="fa fa-upload uploads_logo_i" aria-hidden="true" />
            </div>
            <Navbar details={"Home"} />
            <h1 className="main_heading">Store and share your data.</h1>
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

export default EmailSent;
