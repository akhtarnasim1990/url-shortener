import React, { Component } from "react";
import "./App.css";

import Home from "./Layouts/Pages/Home/Home";
import LoginForm from "./Layouts/Pages/LoginForm/LoginForm";
import SignUpForm from "./Layouts/Pages/SignUpForm/SignUpForm";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RedirectTo from "./Layouts/Pages/RedirectTo/RedirectTo";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={2000} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={LoginForm} />
          <Route exact path="/Signup" component={SignUpForm} />
          <Route exact path="/:urlCode" component={RedirectTo} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
