import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./env-styles.scss";
import { App } from "./app";

const rootElementId = "root";
const rootElement = document.getElementById(rootElementId);
if (!rootElement) {
    throw new Error(`Root element with ID ${rootElementId} not found`);
}

const root = createRoot(rootElement);
root.render(
    // <StrictMode>
        <App />
    // </StrictMode>
);
