import React, { Component } from "react";
import TextField from "../common/TextField";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import validateLoginForm from "../../validation/loginForm";

class Login extends Component {
  state = {
    email: "",
    password: "",
    hidden: true,
    errors: null,
    emailError: null,
    passwordError: null
  };

  componentDidMount() {
    console.log(this.props.error);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    this.setState({
      emailError: null,
      passwordError: null
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.error) {
      this.setState({ errors: nextProps.error });
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    const { isValid, errors } = validateLoginForm(user);
    console.log(errors);
    if (!isValid) {
      this.setState({
        emailError: errors.email,
        passwordError: errors.password
      });
    } else {
      this.setState({
        emailError: null,
        passwordError: null
      });
      this.props.loginUser(user, this.props.history);
    }
  };
  render() {
    const { emailError, passwordError } = this.state;
    return (
      <div className="container login_home">
        <div className="login container">
          <div className="row justify-content-center">
            <div className="col-8 center_text m-auto">

            {this.state.emailError === null && this.state.passwordError === null && (
              <div className="error-output">{this.state.errors}</div>
            )}
              <h1 className="login_heading display-5 text-center"> Login</h1>
              <div className="login_form text-center">
                <form
                  noValidate
                  className="login_form"
                  onSubmit={this.onSubmit}
                >
                  <TextField
                    placeholder="ex: tanuj.sood@gmail.com"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    label="Email Address"
                    error={emailError}
                  />
                  <TextField
                    placeholder="ex: password12345"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    label="Password"
                    error={passwordError}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4 login_button"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Add prop-types
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
