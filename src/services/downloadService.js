import { getApiUrl } from "../utils/helpers";

export const downlaodAsPDFApi = (params) => {
  return fetch(getApiUrl("save-as-pdf"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(params),
  }).then((response) => response.blob());
};
