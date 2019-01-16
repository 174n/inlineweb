import store from "./store";
const basepath = "http://localhost:8000/";

export default async (url, method = "GET", body) => {
  return await (await fetch(basepath + url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.state.token}`
    }
  })).json();
};
