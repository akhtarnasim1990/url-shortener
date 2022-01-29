import React, { Component } from "react";
import "./Model.css";

import { IoCloseSharp } from "react-icons/io5";
import Loader from "../Loader/Loader";
import axios from "axios";
import firebase from "firebase";

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl: "",
      showShortUrl: false,
      loading: false,
      showShortUrl: false,
      email: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          email: user.email,
        });
      }
    });
  }

  inputHandler = (e) => {
    this.setState({
      longUrl: e.target.value,
    });
  };

  urlHandler = (e) => {
    this.setState({
      loading: true,
    });
    axios.post("http://localhost:5000/api/shortUrl", { longUrl: this.state.longUrl, email: this.state.email }).then((response) => {
      if (response) {
        this.setState(
          {
            loading: false,
          },
          () => {
            this.props.fetchUrls();
            this.props.modalCloseHandler(false);
          }
        );
      }
    });
  };

  render() {
    return (
      <div className="model-container">
        <div className="model-content">
          <div className="close">
            <IoCloseSharp className="close-icon" onClick={() => this.props.modalCloseHandler(false)} />
          </div>
          <div className="model-body">
            {this.state.loading ? (
              <div className="loading" style={{ width: "1rem", height: "1rem" }}>
                <Loader color="#334052" />
              </div>
            ) : (
              <div className="row">
                <p>Enter Long URL</p>
                <input type="text" placeholder="Enter Long URL..." value={this.state.longUrl} onChange={this.inputHandler} />
              </div>
            )}

            {this.state.showShortUrl ? (
              <div className="row">
                <p>Short URL</p>
                <p>nnv insnbdxf ienbdxkjfn nelskbflnb</p>
              </div>
            ) : null}

            <div className="button">
              <p onClick={this.urlHandler}>Submit</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Model;
