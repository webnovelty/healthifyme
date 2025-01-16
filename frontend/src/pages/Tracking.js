import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const Tracking = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Tracking Your Progress
      </Typography>

      {/* Tracking cards grid */}
      <Grid container spacing={3}>
        {["Water Intake", "Calories Burned", "Daily Steps"].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item}
                </Typography>
                <Typography variant="body1">Data: ---</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tracking;
