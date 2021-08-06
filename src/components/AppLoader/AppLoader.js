import React from "react";
import loader from "../../loader.gif";
import "./app-loader.scss";

const AppLoader = () => {
  return (
    <div className="app-loader">
      <img src={loader} alt="loading...." />
    </div>
  );
};

export default AppLoader;
