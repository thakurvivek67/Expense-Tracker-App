import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Store from "./store/Store";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider Store={Store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
