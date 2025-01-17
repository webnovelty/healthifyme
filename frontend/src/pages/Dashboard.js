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
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataContext } from "../context/DataContext";

const Dashboard = () => {
  const { updateData } = useContext(DataContext);

  const [userName, setUserName] = useState("User");
  const [userData, setUserData] = useState({
    water: 0,
    steps: 0,
    calories: 0,
  });
  const [inputFields, setInputFields] = useState({
    water: 0,
    steps: 0,
    calories: 0,
  });

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "https://healthifyme-backend.onrender.com/api/user/user-info",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserName(response.data.name || "User");
        setUserData({
          water: response.data.water || 0,
          steps: response.data.steps || 0,
          calories: response.data.calories || 0,
        });
        const historyResponse = await axios.get(
          "https://healthifyme-backend.onrender.com/api/user/history",
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

  const handleSave = async (field) => {
    const token = Cookies.get("token");

    try {
      const inputValue = parseInt(inputFields[field], 10) || 0; // Value from the input field
      const updatedValue = userData[field] + inputValue; // Add to the current value
      await axios.put(
        "https://healthifyme-backend.onrender.com/api/user/update",
        { [field]: updatedValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      updateData({ [field]: updatedValue });

      setUserData((prev) => ({
        ...prev,
        [field]: updatedValue,
      }));

      // Reset only the input field
      setInputFields((prev) => ({
        ...prev,
        [field]: 0,
      }));

      toast.success(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } updated successfully!`,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  // End the day and save data to history
  const handleEndDay = async () => {
    const token = Cookies.get("token");
    try {
      await axios.post(
        "https://healthifyme-backend.onrender.com/api/user/end-day",
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
      // Request history data again
      const historyResponse = await axios.get(
        "https://healthifyme-backend.onrender.com/api/user/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the state of the graph
      setHistoryData(historyResponse.data);
    } catch (error) {
      console.error("Error ending the day:", error);

      // Display error notification
      toast.error("Failed to end the day.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Welcome, {userName}!
      </Typography>
      <Typography variant="h7" gutterBottom>
        Here you can enter how much water you drank, how many steps you walked
        and how many calories you have consumed today.
      </Typography>

      <Grid container spacing={3}>
        {[
          { label: "Water", field: "water" },
          { label: "Steps", field: "steps" },
          {
            label: "Calories",

            field: "calories",
          },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.field}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Add ${item.label}`}
                  value={inputFields[item.field]}
                  onChange={(e) =>
                    setInputFields((prev) => ({
                      ...prev,
                      [item.field]: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave(item.field)}
                  sx={{ marginTop: 2 }}
                >
                  Add
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Button variant="contained" color="secondary" onClick={handleEndDay}>
          End Day
        </Button>
      </Box>
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
    </Box>
  );
};

export default Dashboard;
