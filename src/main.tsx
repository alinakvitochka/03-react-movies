import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";

import { Toaster } from "react-hot-toast";
import App from "./components/App/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-center" />
  </React.StrictMode>
);