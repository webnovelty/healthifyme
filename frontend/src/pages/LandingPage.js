import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

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
        FITNESS CLUB
      </Typography>
      <Typography variant="h1" color="#39b8d6" fontWeight="bold" gutterBottom>
        SHAPE YOUR BODY
      </Typography>
      <Typography
        variant="body1"
        color="#fff"
        align="center"
        sx={{ maxWidth: "600px", marginBottom: 4 }}
      >
        A good quality health or fitness centre provides a safe environment for
        exercise and is supervised by trained professionals.
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
          onClick={() => navigate("/register")}
        >
          Join Us
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
