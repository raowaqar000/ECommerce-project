import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
// import {WelcomeMessage} from "./Tests/React/WelcomeMessage.jsx"
// import { Counter } from "./Tests/React/Counter.jsx";
// import {Parent} from "./Tests/React/Parent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* <WelcomeMessage />
      <br />
      <Counter />
      <br />
      <Parent /> */}
    </BrowserRouter>
  </StrictMode>
);
