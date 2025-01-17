// src/App.js

import { Toolbar } from "@mui/material";
import Cookies from "js-cookie"; // Using js-cookie for cookie management
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Educational from "./pages/Educational";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Tracking from "./pages/Tracking";
import { DataProvider } from "./context/DataContext"; // Import the DataProvider

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  // Check cookies on app load and whenever the authenticated state changes
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove token from cookies
    setAuthenticated(false); // Update authentication state
  };

  const PrivateRoute = ({ element }) => {
    return authenticated ? element : <Navigate to="/" />;
  };

    return (
      <DataProvider>
        <Router>
          {authenticated && (
            <>
              <NavBar
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                handleLogout={handleLogout}
              />
              <Toolbar />
            </>
          )}
          <Routes>
            <Route
              path="/"
              element={
                authenticated ? (
                  <Dashboard />
                ) : (
                  <LandingPage setAuthenticated={setAuthenticated} />
                )
              }
            />
            <Route
              path="/tracking"
              element={<PrivateRoute element={<Tracking />} />}
            />
            <Route
              path="/settings"
              element={<PrivateRoute element={<Settings />} />}
            />
            <Route
              path="/educational"
              element={<PrivateRoute element={<Educational />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </DataProvider>
    );
};

export default App;
