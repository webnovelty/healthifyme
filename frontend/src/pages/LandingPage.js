import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../image/healthifyme.svg";

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
    // Check that all fields are filled in
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Stop execution if validation fails
    }
    try {
      const response = await axios.post(
        "https://healthifyme-backend.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      // Save the token to cookies
      Cookies.set("token", response.data.token, { expires: 1 }); // validity period - 1 day

      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      setAuthenticated(true); // Update authentication state
      setRegisterOpen(false);
      navigate("/"); // Redirect to the authenticated page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed.";
      console.error(errorMessage);

      // Показываем ошибку через toast
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://healthifyme-backend.onrender.com/api/auth/login",
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
      const errorMessage = error.response?.data?.message || "Login failed.";
      console.error(errorMessage);

      // Показываем ошибку через toast
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <Box
      sx={{
        backgroundImage: 'url("/bg.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        position: "relative",
        minHeight: "100vh",
        padding: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      {/* Toast Notification Container */}
      <ToastContainer />
      {/* Blackout Layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1, // Background for the layer
        }}
      ></Box>
      {/* Header */}

      {/* Header Section */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          flex: "0 1 auto",
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
          padding: 2,
          gap: { xs: "20px", md: "250px" },
        }}
      >
        {/* Логотип */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            padding: 2,
            gap: { xs: "20px", md: "250px" },
          }}
        >
          <img src={logo} alt="HealthifyMe Logo" className="logo_on_LG" />
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            flex: "1 1 auto",
            textAlign: { xs: "center", md: "left" },
            padding: 2,
            marginTop: { xs: 4, md: 0 },
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            Your Health, Your Way
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 4 }}>
            Start your fitness journey today!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "flex-end" },
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button
              aria-label="Register as a new user"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#87CEEB",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "30px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#45a049",
                  transform: "scale(1.05)",
                },
              }}
              onClick={handleRegisterOpen}
            >
              Join Us
            </Button>
            <Button
              aria-label="Start exploring the application"
              variant="outlined"
              color="secondary"
              sx={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "30px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#45a049",
                  transform: "scale(1.05)",
                },
              }}
              onClick={handleLoginOpen}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        ></Grid>
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
