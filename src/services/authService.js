import { getApiUrl } from "../utils/helpers";
import Storage from "./storageService";
export const registerService = ({
  firstname,
  lastname,
  username,
  email,
  password,
  roleName,
}) => {
  return fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify({
      firstname,
      lastname,
      username,
      email,
      password,
      roleName,
    }),
  }).then((response) => response.json());
};

export const loginService = ({ email, password }) => {
  return fetch(getApiUrl("login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());
};

export const logoutService = ({ email, password }) => {
  return fetch(getApiUrl("logout"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify({ email }),
  }).then((response) => response.json());
};

export const verifyService = (user) => {
  return fetch(getApiUrl("verify"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
      mode: "no-cors",
    },
    body: JSON.stringify({ user }),
  }).then((response) => response.json());
};

export const getAuthToken = () => Storage.getItem("token");
export const setAuthToken = (token) => Storage.setItem("token", token);
export const removeAuthToken = () => Storage.removeItem("token");
