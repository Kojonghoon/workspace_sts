import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ImageUploader from "./service/ImageUploader";

const imageUploader = new ImageUploader();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <App imageUploader={imageUploader} />
    </BrowserRouter>
  </>
);
