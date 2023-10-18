import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./main.css";

const appDom = document.getElementById("app");

if (appDom) {
  const root = createRoot(appDom);
  root.render(<App />);
}
