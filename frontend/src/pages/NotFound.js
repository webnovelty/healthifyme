

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 4,
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
