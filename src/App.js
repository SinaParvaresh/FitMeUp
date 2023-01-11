import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<PasswordReset />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home-page" element={<HomePage />} />
              <Route path="/user-profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
