import React from "react";
import loader from "../../content/imgs/logo.gif";
import "./app-loader.scss";

const AppLoader = () => {
  //logo image source
  // https://www.animatedimages.org/cat-trees-47.htm
  return (
    <div className="app-loader">
      <img src={loader} alt="loading...." />
    </div>
  );
};

export default AppLoader;
