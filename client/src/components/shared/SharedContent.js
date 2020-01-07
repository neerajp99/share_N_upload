import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    console.log(this.state.files);
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
                  <button className="shareContent_button_top btn btn-primary btn-lg btn-block">
                    DOWNLOAD FILES
                  </button>
                  <button className="shareContent_button_bottom btn btn-primary btn-lg btn-block">
                    SHARE FILES
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 landing_container_right" />
        </div>
      </div>
    );
  }
}

export default SharedContent;
