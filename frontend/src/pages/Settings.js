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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [userData, setUserData] = useState({
    avatar: "",
    weight: "",
    height: "",
    age: "",
  });

  const [isEditing, setIsEditing] = useState(false);

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
        setUserData({
          avatar: response.data.avatar || "",
          weight: response.data.weight || "",
          height: response.data.height || "",
          age: response.data.age || "",
        });
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = async (event) => {
    const token = Cookies.get("token");
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.put(
        "https://healthifyme-backend.onrender.com/api/user/update-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData((prev) => ({
        ...prev,
        avatar: response.data.avatar, 
      }));

      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Failed to update avatar.");
    }
  };

  const handleSave = async () => {
    const token = Cookies.get("token");
    const formData = new FormData();

    formData.append("weight", userData.weight);
    formData.append("height", userData.height);
    formData.append("age", userData.age);

    try {
      const response = await axios.put(
        "https://healthifyme-backend.onrender.com/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData((prev) => ({
        ...prev,
        ...response.data, 
      }));

      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings.");
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Avatar Preview */}
                <img
                  src={
                    userData.avatar && userData.avatar !== "/default-avatar.png"
                      ? `https://healthifyme-backend.onrender.com${userData.avatar}`
                      : "/default-avatar.png"
                  }
                  alt="User Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "16px",
                    objectFit: "cover",
                  }}
                />
                <Button variant="outlined" component="label">
                  Upload Avatar
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {isEditing ? (
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Weight (kg)"
                    value={userData.weight || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        weight: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Height (cm)"
                    value={userData.height || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        height: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Age"
                    value={userData.age || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        age: e.target.value,
                      }))
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ marginTop: 2 }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <>
                    <Typography variant="body1">
                      <strong>Weight:</strong> {userData.weight} kg
                    </Typography>
                    <Typography variant="body1">
                      <strong>Height:</strong> {userData.height} cm
                    </Typography>
                    <Typography variant="body1">
                      <strong>Age:</strong> {userData.age} years
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setIsEditing(true)}
                      sx={{ marginTop: 2 }}
                    >
                      Edit
                    </Button>
                  </>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
