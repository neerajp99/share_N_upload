import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Background from "../../utils/img/cubes.png";
import Navbar from "../Navbar";
import { CopyToClipboard } from "react-copy-to-clipboard";

class SharedContent extends Component {
  state = {
    from: null,
    to: null,
    message: null,
    files: []
  };

  componentDidMount() {
    axios
      .get(`/api/shared/${this.props.match.params.id}`)
      .then(data => {
        // console.log(data.data);
        this.setState({
          from: data.data.from,
          to: data.data.to,
          message: data.data.message,
          files: data.data.files
        });
      })
      .catch(error => {
        console.log(error);
      });
    // console.log(this.props.match.params)
  }

  // Get total size of the files
  total = () => {
    // Intiialise total size as 0
    let totalSize = 0;
    for (let i = 0; i < this.state.files.length; i++) {
      totalSize += this.state.files[i].size;
    }
    // console.log(totalSize);
    totalSize = totalSize / (1024 * 1024);

    return totalSize.toFixed(1);
  };

  // Delete speicfic files
  onClickDownload = filename => {
    axios
      .get(`/api/appRoute/download/${filename}`)
      .then(res => {
        console.log(res);
        res.download(res.data);
        console.log("File dowloaded!");
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };
  render() {
    // console.log(this.state.files[0]);
    const items = this.state.files.map((item, key) => (
      <li className="shareContent_list_item" key={key}>
        <div className="shareContent_list_item_left">{item.fileName}</div>
        <div className="shareContent_list_item_right">
          <a
            href={`http://localhost:5010/api/appRoute/download/${
              item.fileName
            }`}
          >
            <i className="fa fa-lg fa-download" aria-hidden="true" />
          </a>
        </div>
      </li>
    ));
    return (
      <div className="sharedContent">
        <div className="row">
          <div className="col-md-6 landing_container_left">
            <div className="shareContent_left">
              <div className="shareContent_left_top" />
              <div className="shareContent_left_bottom">
                <h4 className="shareContent_heading">Download files!</h4>
                <div className="shareContent_items">
                  <div className="shareContent_items_first">
                    {this.state.files.length}{" "}
                    {this.state.files.length > 1 ? "files" : "file"}
                  </div>
                  <div className="shareContent_items_second">
                    Expires in 30 Days
                  </div>
                  {this.state.files.length > 0 && (
                    <div className="shareContent_items_third">
                      {this.total()} MB
                    </div>
                  )}
                </div>
                <div className="shareContent_list_div">
                  <ul className="shareContent_list">{items}</ul>
                </div>
                <div className="shareContent_buttons">
                  <a
                    className="shareContent_button_top_link"
                    href={`http://localhost:5010/api/appRoute/download/all/${
                      this.props.match.params.id
                    }`}
                  >
                    <button className="shareContent_button_top btn btn-primary btn-lg btn-block">
                      DOWNLOAD FILES
                    </button>
                  </a>
                  <CopyToClipboard
                        text={`http://localhost:5010/api/shared/${this.props.match.params.id}`}
                        onCopy={() => this.setState({ copied: true })}
                      >
                  <button className="shareContent_button_bottom btn btn-primary btn-lg btn-block">
                    COPY LINK
                  </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 landing_container_right">
            <div className="uploads_logo">
              <i className="fa fa-upload uploads_logo_i" aria-hidden="true" />
            </div>
            <Navbar details={"Uploads"} />
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

export default SharedContent;
