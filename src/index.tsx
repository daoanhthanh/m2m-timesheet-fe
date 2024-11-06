import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles.css";

import "@/providers/i18n";

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
