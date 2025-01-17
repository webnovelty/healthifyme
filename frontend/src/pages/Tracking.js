import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const Tracking = () => {
  const { data, updateData } = useContext(DataContext);

  const [userDetails, setUserDetails] = useState({
    weight: 70,
    height: 170,
    age: 30,
    gender: "male",
  });

  const [dailyGoals, setDailyGoals] = useState({
    water: 2000,
    steps: 10000,
    calories: 2500,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "https://healthifyme-backend.onrender.com/api/user/user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserDetails({
          weight: response.data.weight || 70,
          height: response.data.height || 170,
          age: response.data.age || 30,
          gender: response.data.gender || "male",
        });

        // Dynamic goals calculation based on user details
        setDailyGoals({
          water: Math.round((response.data.weight || 70) * 35), // ml/day
          steps: 10000,
          calories:
            response.data.gender === "male"
              ? Math.round(
                  10 * (response.data.weight || 70) +
                    6.25 * (response.data.height || 170) -
                    5 * (response.data.age || 30) +
                    5
                )
              : Math.round(
                  10 * (response.data.weight || 70) +
                    6.25 * (response.data.height || 170) -
                    5 * (response.data.age || 30) -
                    161
                ),
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Tracking Your Progress
      </Typography>

      {/* Tracking cards grid */}
      <Grid container spacing={3}>
        {[
          {
            label: "Water Intake",
            value: data.water,
            goal: dailyGoals.water,
            unit: "ml",
            successMessage: "Goal achieved!",
            failureMessage: null,
            color: "green",
          },
          {
            label: "Steps Walked",
            value: data.steps,
            goal: dailyGoals.steps,
            unit: "steps",
            successMessage: "Goal achieved!",
            failureMessage: null,
            color: "green",
          },
          {
            label: "Calories Consumed",
            value: data.calories,
            goal: dailyGoals.calories,
            unit: "kcal",
            successMessage: null,
            failureMessage: "You ate too much!",
            color: "red",
          },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.label}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {item.label}
                    </Typography>
                    <Typography variant="body1">
                      {item.value} / {item.goal} {item.unit}
                    </Typography>
                  </Box>
                  <Box>
                    {item.value >= item.goal && item.successMessage && (
                      <Typography
                        variant="body2"
                        sx={{ color: item.color, fontWeight: "bold" }}
                      >
                        {item.successMessage}
                      </Typography>
                    )}
                    {item.value > item.goal && item.failureMessage && (
                      <Typography
                        variant="body2"
                        sx={{ color: item.color, fontWeight: "bold" }}
                      >
                        {item.failureMessage}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tracking;
