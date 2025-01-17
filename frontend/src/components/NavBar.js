import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu Icon
import { Link } from "react-router-dom";
import logo from "../image/healthifyme.svg"; // Importing the logo

const NavBar = ({ authenticated, handleLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle drawer state
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          boxShadow: "none", // Remove shadow for a flat look
          
        }}
      >
        <Toolbar>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img src={logo} alt="HealthifyMe Logo" className="logo" />
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {!authenticated ? (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/">
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/tracking">
                  Tracking
                </Button>
                <Button color="inherit" component={Link} to="/settings">
                  Settings
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { width: "250px" } }}
      >
        <List>
          {!authenticated ? (
            <>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/register"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="Register" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                component={Link}
                to="/"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/tracking"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="Tracking" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/settings"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
