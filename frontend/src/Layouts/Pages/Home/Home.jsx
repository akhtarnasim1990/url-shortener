import React, { Component } from "react";
import "./Home.css";

import firebase from "firebase";
import Model from "../../Components/Model/Model";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      email: "",
      URLData: [],
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = "/Signup";
      } else {
        this.setState(
          {
            email: user.email,
          },
          () => {
            this.fetchUrls();
          }
        );
      }
    });
  }

  fetchUrls = (e) => {
    axios.post("http://localhost:5000/api/fetchUrl", { email: this.state.email }).then((response) => {
      console.log(response.data);
      this.setState({
        URLData: response.data,
      });
    });
  };

  showLoginHandler = (e) => {
    this.setState({
      showLogin: true,
    });
  };

  logoutHandler = (e) => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        if (res) {
          window.location.href = "/Signup";
        }
        toast.success("Logout successful");
      });
  };

  modalCloseHandler = (e) => {
    this.setState({
      showModel: e,
    });
  };

  render() {
    return (
      <>
        {this.state.showModel ? <Model fetchUrls={this.fetchUrls} modalCloseHandler={this.modalCloseHandler} /> : null}
        <div className="home-container">
          <div className="home-content">
            <div className="header">
              <div className="left">
                <p>Welcome to URL Shortener!</p>
              </div>
              <div className="right">
                <p onClick={() => this.modalCloseHandler(true)}>Short URL</p>
                <p onClick={this.logoutHandler}>Logout</p>
              </div>
            </div>
            <div className="body">
              <div className="body-content">
                <div className="body-header">
                  <p>Shortened URL</p>
                </div>
                {this.state.URLData.length === 0 ? (
                  <p>you dont have any short urls</p>
                ) : (
                  <div className="table">
                    <div className="title">
                      <div className="row">
                        <p>Sl no.</p>
                        <p>Long URL</p>
                        <p>Short URL</p>
                        <p>Clicks</p>
                      </div>
                    </div>
                    <div className="title  description">
                      {this.state.URLData.map((url, index) => {
                        return (
                          <div key={url._id} className="row">
                            <p>{index + 1}</p>
                            <p>{url.longUrl.slice(0, 27)}... </p>
                            <p>{url.shortUrl}</p>
                            <p>{url.hits}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
