import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Dashboard = () => {
  // State for user name
  const [userName, setUserName] = useState("User");

  // State for user data
  const [userData] = useState({
    weight: 75, // Example data
    steps: 5000,
    calories: 1500,
  });

  // State for recommendations
  const [recommendation, setRecommendation] = useState("");

  // Fetch user name from API
  useEffect(() => {
    const fetchUserName = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserName(response.data.name || "User");
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        Cookies.remove("token");
      }
    };

    fetchUserName();
  }, []);

  // Generate a recommendation based on data
  useEffect(() => {
    if (userData.steps < 6000) {
      setRecommendation("Try to walk at least 10,000 steps today.");
    } else if (userData.calories < 1800) {
      setRecommendation("Make sure to eat a balanced diet today.");
    } else {
      setRecommendation("Keep up the great work!");
    }
  }, [userData]);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Welcome, {userName}!
      </Typography>

      {/* Tracking cards grid */}
      <Grid container spacing={3}>
        {[
          { label: "Weight", value: `${userData.weight} kg` },
          { label: "Steps", value: `${userData.steps} steps` },
          { label: "Calories", value: `${userData.calories} kcal` },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.label}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recommendations block */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Today's Recommendations
            </Typography>
            <Typography variant="body1">{recommendation}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Action buttons */}
      <Box mt={4} display="flex" gap={2}>
        <Button variant="contained" color="primary">
          Enter Data
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/educational"
        >
          View Articles
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
