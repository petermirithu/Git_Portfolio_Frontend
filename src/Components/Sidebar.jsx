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
      <div style={{ width: '200px', height: '100%', backgroundColor: '#f0f0f0', padding: '16px' }}>
        <Avatar alt="User Avatar" src="/static/images/avatar.jpg" sx={{ width: 200, height: 200 }} />
        <TextField
          label="Username"
          value={userData.username}
          fullWidth
          variant="outlined"
          disabled={!isEditing}
          onChange={(e) => handleInputChange('username', e.target.value)}
          sx={{ marginTop: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        />
        <TextField
          label="Full Name"
          value={userData.fullName}
          fullWidth
          variant="outlined"
          disabled={!isEditing}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          sx={{ marginTop: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        />
        <TextField
          label="Details"
          multiline
          rows={4}
          value={userData.details}
          fullWidth
          variant="outlined"
          disabled={!isEditing}
          onChange={(e) => handleInputChange('details', e.target.value)}
          sx={{ marginTop: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        />

        <Button variant="outlined" onClick={handleEditClick} sx={{ marginTop: 2 }}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        {/* Additional details or menu items can be added here */}
      </div>
    </Drawer>
  );
};

export default Sidebar;
