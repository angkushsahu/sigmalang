import "./styles/globals.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { OutputProvider } from "./context";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <OutputProvider>
            <App />
        </OutputProvider>
    </StrictMode>
);
