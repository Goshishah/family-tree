export const getApiUrl = (endpoint) => {
  let apiBaseURL = "https://syed-family-tree-backend.herokuapp.com";
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    apiBaseURL = "http://localhost:8080";
  }
  return `${apiBaseURL}/api/${endpoint}`;
};
