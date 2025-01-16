// src/pages/Login.js

import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios"; // Using axios for queries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Importing js-cookie

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save token in cookies
      Cookies.set("token", response.data.token, { expires: 1 }); // Expires in 1 day
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || "Error");
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
