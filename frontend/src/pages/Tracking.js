import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const Tracking = () => {
  const { data, updateData } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
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

        updateData({
          water: response.data.water,
          steps: response.data.steps,
          calories: response.data.calories,
        });
      } catch (error) {
        console.error("Failed to fetch tracking data:", error);
      }
    };

    fetchData();
  }, [updateData]);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Tracking Your Progress
      </Typography>

      {/* Tracking Cards Grid */}
      <Grid container spacing={3}>
        {[
          { label: "Water Intake", value: `${data.water || 0} ml` },
          { label: "Calories Burned", value: `${data.calories || 0} kcal` },
          { label: "Daily Steps", value: `${data.steps || 0}` },
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
    </Box>
  );
};

export default Tracking;
