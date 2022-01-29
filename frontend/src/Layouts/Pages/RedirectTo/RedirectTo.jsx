import React, { Component, useState, useEffect } from "react";
import "./RedirectTo.css";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

import { useParams, withRouter } from "react-router-dom";

const RedirectTo = () => {
  let [codeUrl, setCodeUrl] = useState("");

  const location = useParams();

  useEffect(() => {
    console.log(location.urlCode);
    axios.post("http://localhost:5000/api/redirectRoute", { urlCode: location.urlCode }).then((response) => {
      console.log(response);
      if (response) {
        window.location.href = response.data.longUrl;
      }
    });
  });

  return (
    <div className="main-container" style={{ width: "100%", height: "100vh", dispaly: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="loading" style={{ width: "5rem", height: "5rem", dispaly: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* <Loader color="#334052" /> */}
      </div>
    </div>
  );
};

export default RedirectTo;
