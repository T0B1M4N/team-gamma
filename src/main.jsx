import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppWrapper } from "./AppContext"; // Already contains the app layout

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
