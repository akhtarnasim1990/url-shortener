import React, { Component } from "react";
import "./LoginForm.css";

import firebase from "firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginHandler = (e) => {
    let d = {
      email: this.state.email,
      password: this.state.password,
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCred) => {
        if (userCred) {
          console.log(userCred.user);
          toast.success("Login successfully!");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  render() {
    return (
      <div className="form-container login-container">
        <div className="form-body">
          <div className="form-info">
            <div className="row">
              <p className="label">Email</p>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.inputHandler}
                placeholder="Enter your email..."
                className="input"
              />
            </div>
            <div className="row">
              <p className="label">password</p>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.inputHandler}
                placeholder="Enter your password..."
                className="input"
              />
            </div>

            <div className="button">
              <p onClick={this.loginHandler}>Login</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
