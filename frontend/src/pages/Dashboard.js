import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // State for user name
  const [userName, setUserName] = useState("User");

  // State for user data
  const [userData, setUserData] = useState({
    water: 0,
    steps: 0,
    calories: 0,
  });
  // State for history data
  const [historyData, setHistoryData] = useState([]);
  // Fetch user name and data from API
  useEffect(() => {
    const fetchUserInfo = async () => {
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
        setUserData({
          water: response.data.water || 0,
          steps: response.data.steps || 0,
          calories: response.data.calories || 0,
        });
        const historyResponse = await axios.get(
          "http://localhost:5000/api/user/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHistoryData(historyResponse.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        Cookies.remove("token");
      }
    };

    fetchUserInfo();
  }, []);

  // Save the updated value to the database
  const handleSave = async (field, value) => {
    const token = Cookies.get("token");
    try {
      const updatedData = { ...userData, [field]: value };
      await axios.put(
        "http://localhost:5000/api/user/update",
        { [field]: value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(updatedData); // Update the state with the new value
      toast.success(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } updated successfully!`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data.", {
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
  // End the day and save data to history
  const handleEndDay = async () => {
    const token = Cookies.get("token");
    try {
      await axios.post(
        "http://localhost:5000/api/user/end-day",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Day ended successfully, data saved!", {
        position: "top-center",
        autoClose: 3000,
      });
      setUserData({ water: 0, steps: 0, calories: 0 });
    } catch (error) {
      console.error("Error ending the day:", error);
      toast.error("Failed to end the day.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Welcome, {userName}!
      </Typography>

      {/* Tracking cards grid */}
      <Grid container spacing={3}>
        {[
          { label: "Water", value: `${userData.water} kg`, field: "water" },
          { label: "Steps", value: `${userData.steps} steps`, field: "steps" },
          {
            label: "Calories",
            value: `${userData.calories} kcal`,
            field: "calories",
          },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.label}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.label}
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Enter ${item.label}`}
                  value={userData[item.field]}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      [item.field]: e.target.value,
                    }))
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleSave(item.field, parseInt(userData[item.field], 10))
                  }
                  sx={{ marginTop: 2 }}
                >
                  Add
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* End Day Button */}
      <Box mt={4}>
        <Button variant="contained" color="secondary" onClick={handleEndDay}>
          End Day
        </Button>
      </Box>

      {/* Progress History */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Progress History
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="water" stroke="#8884d8" />
            <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
            <Line type="monotone" dataKey="calories" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Recommendations block */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Today's Recommendations
            </Typography>
            <Typography variant="body1">Keep up the great work!</Typography>
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
