import { getApiUrl } from "../utils/helpers";

export const getTreeApi = () => {
  return fetch(getApiUrl("get-tree"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
  }).then((response) => response.json());
};

export const postTreeApi = (params) => {
  return fetch(getApiUrl("post-tree"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(params),
  }).then((response) => response.json());
};

export const postFullTreeApi = (params) => {
  return fetch(getApiUrl("post-full-tree"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(params),
  }).then((response) => response.json());
};

export const deleteTreeApi = (params) => {
  return fetch(getApiUrl("delete-node"), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(params),
  }).then((response) => response.json());
};
