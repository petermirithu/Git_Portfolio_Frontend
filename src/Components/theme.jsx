// src/DarkModePage.js
import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

const DarkModePage = ({ darkMode, toggleDarkMode }) => {
  return (
    <Paper elevation={3} style={{ padding: 16, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Dark Mode Page
      </Typography>
      <Typography variant="body1" paragraph>
        This is a sample page. Dark mode is {darkMode ? 'enabled' : 'disabled'}.
      </Typography>
      <Button variant="contained" color="primary" onClick={toggleDarkMode}>
        Toggle Dark Mode
      </Button>
    </Paper>
  );
};

export default DarkModePage;
