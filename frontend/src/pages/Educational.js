// src/pages/Educational.js

import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Educational = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "Benefits of Regular Exercise",
      content: "Exercise helps improve your overall health...",
    },
    {
      id: 2,
      title: "Healthy Eating Tips",
      content: "A balanced diet includes a variety of foods...",
    },
    {
      id: 3,
      title: "Stress Management",
      content: "Managing stress is essential for maintaining health...",
    },
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Educational Articles
      </Typography>

      <Box display="flex" gap={4}>
        {/* List of Articles */}
        <Box flex={1}>
          <Typography variant="h6" gutterBottom>
            Articles List
          </Typography>
          <List>
            {articles.map((article) => (
              <ListItem key={article.id} disablePadding>
                <ListItemButton onClick={() => setSelectedArticle(article)}>
                  <ListItemText primary={article.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Selected Article Content */}
        <Box flex={2}>
          {selectedArticle ? (
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {selectedArticle.title}
                </Typography>
                <Typography variant="body1">
                  {selectedArticle.content}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body1">
              Please select an article to view its content.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Educational;
