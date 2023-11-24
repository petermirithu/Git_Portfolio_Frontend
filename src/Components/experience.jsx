import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const ExperienceTab = () => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="Enter your experience details" multiline rows={4} variant="outlined" />
    </Box>
  );
};

export default ExperienceTab;
