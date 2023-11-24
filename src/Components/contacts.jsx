import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const ContactTab = () => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="Enter your contact information" variant="outlined" />
    </Box>
  );
};

export default ContactTab;
