import React from "react";
import "./Loader.css";
export default class Loader extends React.Component {
  render() {
    return <div className="loader" style={{ borderTop: "5px solid " + this.props.color }}></div>;
  }
}
