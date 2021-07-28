const getApiUrl = (endpoint) => {
  let apiBaseURL = "https://syed-family-tree-backend.herokuapp.com";
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    apiBaseURL = "http://localhost:8080";
  }
  return `${apiBaseURL}/api/${endpoint}`;
};

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
