import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Sidebar = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'john_doe',
    fullName: 'John Doe',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  });
  
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const detailsLength = userData.details.length;

  return (
    <Drawer variant="permanent">
      <Toolbar />
      <div style={{ width: '200px', height: '100%', backgroundColor: '#E5E4E2', padding: '16px' }}>
        <Avatar alt="Image" src="src\assets\pman.jpg" sx={{ width: 200, height: 200 }} />
        <TextField
            label="Username"
            value={userData.username}
            fullWidth
            variant="outlined"
            disabled  // Disable editing for the TextField
            onChange={(e) => handleInputChange('username', e.target.value)}
            InputLabelProps={{
              style: { fontWeight: 'bold', fontSize: '25px' }, // Adjust font weight and size as needed
            }}
            sx={{ marginTop: 5, '& .MuiOutlinedInput-notchedOutline': { border: 'none'  } }}
          />


        <TextField
            label="Full Name"
            value={userData.fullName}
            fullWidth
            variant="outlined"
            disabled  // Disable editing for the TextField
            onChange={(e) => handleInputChange('username', e.target.value)}
            InputLabelProps={{
              style: { fontWeight: 'bold', fontSize: '25px' }, // Adjust font weight and size as needed
            }}
            sx={{ marginTop: 5, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
          />


        <TextField
          label="Details"
          multiline
          rows={8}
          value={userData.details}
          fullWidth
          variant="outlined"
          disabled
          onChange={(e) => handleInputChange('details', e.target.value)}
          InputLabelProps={{
            style: { fontWeight: 'bold', fontSize: '25px' }, // Adjust font weight and size as needed
          }}
          sx={{ marginTop: 5, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        />

        {/* Additional details or menu items can be added here */}
      </div>
    </Drawer>
  );
};

export default Sidebar;
