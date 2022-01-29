import React, { Component } from "react";
import "./SignUpForm.css";

import firebase from "firebase";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dob: "",
      email: "",
      password: "",
    };
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    if (this.state.name === "") {
      return toast.warn("Please enter your name");
    } else if (this.state.email === "") {
      return toast.warn("Please enter your email");
    } else if (!validator.isEmail(this.state.email)) {
      return toast.warn("Please enter your valid email");
    } else if (this.state.dob === "") {
      return toast.warn("Please enter your valid date of birth in correct format");
    }
    let d = {
      name: this.state.name,
      email: this.state.email,
      dob: this.state.dob,
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCred) => {
        console.log(userCred);
        if (userCred) {
          axios
            .post("http://localhost:5000/api/user/createUser", { d }, {})
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          toast.success("Signup successfully");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div className="form-container">
        <div className="form-body">
          <div className="form-info">
            <div className="row">
              <p className="label">Name</p>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.inputHandler}
                placeholder="Enter your name..."
                className="input"
              />
            </div>
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
            <div className="row">
              <p className="label">Date of Birth</p>
              <input type="text" name="dob" value={this.state.dob} onChange={this.inputHandler} placeholder="DD/MM/YYYY" className="input" />
            </div>
            <div className="submit">
              <div className="login">
                <p onClick={() => (window.location.href = "./Login")}>Login?</p>
              </div>
              <div className="button">
                <p onClick={this.submitHandler}>submit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
