import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ScrollToTop from "./components/Layout/ScrollToTop";

import rootRouter from "./router";
import "./styles/global.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <ScrollToTop /> */}
      <RouterProvider router={rootRouter} />
    </RecoilRoot>
  </React.StrictMode>,
);
