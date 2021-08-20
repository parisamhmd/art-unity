import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import "tailwindcss/tailwind.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

axios.defaults.baseURL = "http://37.152.187.245:5000";
axios.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  const { url } = config;
  const notSendToken = url === "/admin/login";

  if (!token && !notSendToken) {
    // window.location.replace("/login");
  } else {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
