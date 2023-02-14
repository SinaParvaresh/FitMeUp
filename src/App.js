import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { NotificationsProvider } from "@mantine/notifications";
import HomePage from "./pages/userPages/HomePage";
import UserProfile from "./pages/userPages/UserProfile";
import CalorieTracker from "./pages/userPages/CalorieTracker";
import MacroTracker from "./pages/userPages/MacroTracker";
import ResetPassword from "./pages/userPages/ResetPassword";
import GetStarted from "./pages/GetStarted";
function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate replace to="/get-started" />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/calorie-tracker" element={<CalorieTracker />} />
                <Route path="/macro-tracker" element={<MacroTracker />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
