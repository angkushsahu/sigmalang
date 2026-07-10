import "./styles/globals.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { AppProvider } from "./context";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>
);
