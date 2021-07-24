export const getTreeApi = () => {
  return fetch(`/get-tree`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
  }).then((response) => response.json());
};

export const postTreeApi = (params) => {
  return fetch(`/post-tree`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(params),
  }).then((response) => response.json());
};

export const deleteTreeApi = (params) => {
  return fetch(`/delete-node`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(params),
  }).then((response) => response.json());
};
