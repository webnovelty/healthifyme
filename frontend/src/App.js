// src/App.js

import React, { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Educational from "./pages/Educational";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Tracking from "./pages/Tracking";
import LandingPage from "./pages/LandingPage";
import Cookies from "js-cookie"; // Using js-cookie for cookie management
import "./App.css";

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
    return authenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      {authenticated && (
        <NavBar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          handleLogout={handleLogout}
        />
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />
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
  );
};

export default App;
