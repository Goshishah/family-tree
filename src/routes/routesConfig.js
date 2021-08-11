import React from "react";
import Login from "../pages/Login/Login";
import AppTree from "../pages/AppTree/AppTree";

// import Register from "../pages/Register/Register";
// import NoMatch from "../pages/NoMatch/NoMatch";

import { ROLES } from "../utils/constants";

export const routesPath = {
  default: "/",
  admin: "/admin",
  register: "/register",
  login: "/login",
  dashbord: "/dashboard",
  nomatch: "/*",
};

const { SUPER_ADMIN, ADMIN, BENEFACTOR, BENEFICIARY, ANONYMOUS } = ROLES;
const routes = [
  {
    name: "default",
    path: routesPath.default,
    exact: true,
    isPublic: true,
    roles: [ANONYMOUS],
    component: <AppTree />,
  },
  {
    name: "login",
    path: routesPath.login,
    exact: false,
    isPublic: true,
    roles: [ANONYMOUS],
    component: <Login />,
  },
  {
    name: "admin",
    path: routesPath.admin,
    exact: false,
    isPublic: false,
    roles: [ADMIN],
    component: <AppTree readOnly={false} />,
  },
  // {
  //   name: "register",
  //   path: routesPath.register,
  //   exact: false,
  //   isPublic: true,
  //   roles: [ANONYMOUS],
  //   component: <Register />,
  // },
  // {
  //   name: "dashboard",
  //   path: routesPath.dashbord,
  //   exact: false,
  //   isPublic: false,
  //   roles: [SUPER_ADMIN, ADMIN, BENEFACTOR, BENEFICIARY],
  //   component: <Dashboard />,
  // },
  // {
  //   name: "nomatch",
  //   path: routesPath.nomatch,
  //   exact: false,
  //   isPublic: true,
  //   roles: [ANONYMOUS],
  //   component: <NoMatch />,
  // },
];

export default routes;
