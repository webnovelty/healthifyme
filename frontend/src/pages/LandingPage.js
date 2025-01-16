import React, { useState } from "react";
import { Box, Typography, Button, Grid, Modal, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPage = ({ setAuthenticated }) => {
  const [registerOpen, setRegisterOpen] = useState(false); // State for registration modal
  const [loginOpen, setLoginOpen] = useState(false); // State for login modal

  const [name, setName] = useState(""); // New state for the user's name

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
          {
            name,
          email,
          password,
        }
      );
      Cookies.set("token", response.data.token); // Save the token in cookies
      setAuthenticated(true); // Update authentication state
      setRegisterOpen(false);
      navigate("/"); // Redirect to the authenticated page
    } catch (error) {
      console.error(error.response?.data || "Registration failed");
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      Cookies.set("token", response.data.token); // Save the token in cookies
      setAuthenticated(true); // Update authentication state
      setLoginOpen(false); // Close the login modal
      navigate("/"); // Redirect to the authenticated page
    } catch (error) {
      console.error(error.response?.data || "Login failed");
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #1c1c1c, #39b8d6)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Typography variant="h3" color="#fff" fontWeight="bold" gutterBottom>
        Your health, your way—start today.
      </Typography>
      <Typography variant="h1" color="#39b8d6" fontWeight="bold" gutterBottom>
        WELCOME
      </Typography>
      <Typography
        variant="body1"
        color="#fff"
        align="center"
        sx={{ maxWidth: "600px", marginBottom: 4 }}
      >
        Take control of your well-being with our easy-to-use tools designed to
        help you live your healthiest life. Track Your Weight: Monitor your
        progress and set achievable goals. Hydration Made Simple: Stay on top of
        your daily water intake with reminders and insights. Calorie Management:
        Balance your diet with accurate calorie tracking tailored to your needs.
        Whether you’re starting your fitness journey or looking to maintain a
        healthy lifestyle, we’re here to support you every step of the way.
        Empower yourself with actionable data and take the guesswork out of your
        health habits. Your health, your way—start today.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Typography variant="h5" color="#fff">
            50+ <br /> EXPERT COACHES
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" color="#fff">
            200+ <br /> MEMBERS JOINED
          </Typography>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={handleRegisterOpen}
        >
          Join Us
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleLoginOpen}>
          Get Started
        </Button>
      </Box>

      {/* Registration Modal */}
      <Modal
        open={registerOpen}
        onClose={handleRegisterClose}
        aria-labelledby="register-modal-title"
        aria-describedby="register-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="register-modal-title" variant="h6" gutterBottom>
            Register
          </Typography>
         
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={handleRegister}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="login-modal-title" variant="h6" gutterBottom>
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
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LandingPage;
