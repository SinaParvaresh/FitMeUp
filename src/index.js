import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./components/store/auth-context";
//theme={{ colorScheme: "dark" }}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </MantineProvider>
);

reportWebVitals();
