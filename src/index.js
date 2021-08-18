import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tree from "./Tree";
import reportWebVitals from "./reportWebVitals";
import StoreProvider from "./store/MainStore";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Tree />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
