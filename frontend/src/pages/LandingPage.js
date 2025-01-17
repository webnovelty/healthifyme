import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../image/healthifyme.svg"; // Importing the logo

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
      // Сохраняем токен в cookies
      Cookies.set("token", response.data.token, { expires: 1 }); // срок действия - 1 день

      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      setAuthenticated(true); // Update authentication state
      setRegisterOpen(false);
      navigate("/"); // Redirect to the authenticated page
    } catch (error) {
      console.error(error.response?.data || "Registration failed");
      alert(error.response?.data?.message || "Registration failed");
      toast.error(error.response?.data?.message || "Registration failed.", {
        position: "top-center",
        autoClose: 3000,
      });
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
        backgroundImage: 'url("/bg.jpeg")', // Путь к вашему изображению
        backgroundSize: "cover", // Изображение полностью покрывает фон
        backgroundPosition: "center", // Центрируем изображение
        backgroundRepeat: "no-repeat", // Избегаем повторения изображения
        color: "white",
        position: "relative",
        minHeight: "100vh",
        padding: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Колонка на мобильных, строка на десктопах
        justifyContent: "center",
        alignItems: { xs: "center", md: "flex-start" }, // Центр на мобильных, слева на десктопах
      }}
    >
      {/* Затемняющий слой */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный черный слой
          zIndex: 1, // Задний план для слоя
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
          justifyContent: { xs: "center", md: "flex-start" }, // Центр на мобильных, слева на десктопах
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
            flex: 1, // Занимает одну часть пространства
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" }, // Центр на мобильных, слева на десктопах
            alignItems: "center",
            padding: 2,
            gap: { xs: "20px", md: "250px" },
          }}
        >
          <img src={logo} alt="HealthifyMe Logo" className="logo_on_LG" />
        </Box>

        {/* Белая фраза */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            flex: "1 1 auto",
            textAlign: { xs: "center", md: "left" }, // Центр на мобильных, слева на десктопах
            padding: 2,
            marginTop: { xs: 4, md: 0 }, // Отступ сверху на мобильных
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
              flexDirection: { xs: "column", md: "row" }, // Вертикальная колонка на мобильных, горизонтальная на десктопах
              justifyContent: { xs: "center", md: "flex-end" }, // Центр на мобильных, справа на десктопах
              gap: 2, // Расстояние между кнопками
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#87CEEB", // Зеленый цвет фона
                color: "white", // Белый текст
                padding: "10px 20px", // Увеличиваем внутренние отступы
                fontSize: "16px", // Увеличиваем размер шрифта
                fontWeight: "bold", // Делаем текст жирным
                borderRadius: "30px", // Закругленные края
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Тень
                transition: "all 0.3s ease", // Анимация при наведении
                "&:hover": {
                  backgroundColor: "#45a049", // Более темный зеленый при наведении
                  transform: "scale(1.05)", // Легкое увеличение кнопки
                },
              }}
              onClick={handleRegisterOpen}
            >
              Join Us
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                backgroundColor: "#4CAF50", // Зеленый цвет фона
                color: "white", // Белый текст
                padding: "10px 20px", // Увеличиваем внутренние отступы
                fontSize: "16px", // Увеличиваем размер шрифта
                fontWeight: "bold", // Делаем текст жирным
                borderRadius: "30px", // Закругленные края
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Тень
                transition: "all 0.3s ease", // Анимация при наведении
                "&:hover": {
                  backgroundColor: "#45a049", // Более темный зеленый при наведении
                  transform: "scale(1.05)", // Легкое увеличение кнопки
                },
              }}
              onClick={handleLoginOpen}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Основной контент */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        {/* Fitness Highlights */}
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
