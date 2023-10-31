import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./main.css";
import "./userWorker";

const appDom = document.getElementById("app");

if (appDom) {
  const root = createRoot(appDom);
  root.render(<App />);
}
