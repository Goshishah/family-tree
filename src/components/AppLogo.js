import React from "react";
import { routesPath } from "../routes/routesConfig";
import loader from "../content/imgs/logo.gif";
import { useHistory } from "react-router-dom";

const AppLogo = ({ clickable = false }) => {
  const history = useHistory();
  const handleLanding = () => history.push(routesPath.default);

  return (
    <img
      style={{ cursor: "pointer" }}
      width="50px"
      src={loader}
      alt="logo"
      onClick={clickable ? handleLanding : null}
    />
  );
};

export default AppLogo;
