import React, { Component } from "react";
import upload from "../utils/img/upload.png";
import InputGroup from "./common/InputField";
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";

class Landing extends Component {
  state = {
    sendTo: "",
    from: "",
    message: "",
    files: []
  };

  // On change method to change the state
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // On Submit method to submit the form
  onSubmit = event => {
    event.preventDefault();
  };

  // Method when file is added
  onChangeFile = event => {
    let file = this.state.files;
    const files = event.target.files;

    Object.keys(files).forEach(key => {
      console.log(files[key]);
      file.push(files[key]);
    });

    this.setState({
      files: file
    });

    // this.state.files.map((key, index) => {
    //   console.log('jajaj')
    // })

    console.log(this.state);
  };

  // Delete items on click
  onDeleteItem = key => {
    console.log(key);
    let { files } = this.state;
    files.splice(key, 1);
    this.setState({
      files: files
    });
    console.log(this.state);
  };

  render() {
    const items = Object.keys(this.state.files).map((key, index) => (
      <div className="upload_files_selected_content" key={key}>
        <div className="upload_files_selected_content_name">
          {this.state.files[key].name}
        </div>
        <div className="upload_files_selected_content_remove">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => this.onDeleteItem(key)}
          />
        </div>
      </div>
    ));
    return (
      <div className="landing">
        <div className="row">
          <div className="col-md-6 landing_container_left">
            <form className="landing_form" onSubmit={this.onSubmit}>
              <div className="main_form_top">
                <div className="upload_files_selected">{items}</div>
                <div className="input_file_div">
                  <label htmlFor={"input-file"}>
                    <input
                      type="file"
                      multiple={true}
                      id={"input-file"}
                      className="input-file"
                      onChange={this.onChangeFile}
                    />
                    <i className="fa fa-upload" aria-hidden="true" />
                    <span className="man_form_top_file_upload">
                      Upload Files Here
                    </span>
                  </label>
                </div>
              </div>
              <div className="main_form_bottom">
                <InputGroup
                  placeholder="Send To"
                  name="sendTo"
                  value={this.state.sendTo}
                  onChange={this.onChange}
                />
                <InputGroup
                  placeholder="Send To"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                />
                <TextAreaFieldGroup
                  placeholder="What's your message?"
                  name="message"
                  value={this.state.message}
                  onChange={this.onChange}
                  info="Tell us about your work position."
                />
                <button
                  className="send_button btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 landing_container_right" />
        </div>
      </div>
    );
  }
}

export default Landing;
