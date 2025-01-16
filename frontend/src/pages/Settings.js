import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const Settings = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Settings form */}
      <Box mt={4}>
        <TextField
          fullWidth
          label="Daily Step Goal"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Water Intake Goal (liters)"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary">
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
