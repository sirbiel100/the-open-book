import React from "react";
import { createRoot } from "react-dom/client";
import { PlasmaProvider } from "@cruxgarden/plasma-ui";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* PlasmaProvider is required for the shared liquid-glass canvas. */}
    <PlasmaProvider
      mood="tidal"
      theme="light"
      background="#f7f3eb"
      tint="#8b4a3c"
      opacity={0.12}
      frost={0.22}
      elevation={0.24}
      quality={0.85}
      maxSurfaces={18}
      grain={0.18}
      glow={0.22}
    >
      <App />
    </PlasmaProvider>
  </React.StrictMode>,
);