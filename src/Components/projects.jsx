import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const ProjectsTab = () => {

    const [open, setOpen] = React.useState(false);

      const handleAddProject = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleSaveProject = () => {
        // Handle saving project details (you can implement this based on your requirements)
        handleClose();
      };
  return (
    <Box
      component="div"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="Enter your projects" multiline rows={4} variant="outlined" />
      <Button variant="contained" color="primary" onClick={handleAddProject}>
        Add Project
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField label="Project Name" variant="outlined" fullWidth margin="normal" />
          <TextField label="Description" variant="outlined" fullWidth multiline rows={4} margin="normal" />
          <TextField label="Technologies Used" variant="outlined" fullWidth margin="normal" />
          <TextField label="GitHub Repository Link" variant="outlined" fullWidth margin="normal" />

          <Button variant="contained" color="primary" onClick={handleSaveProject}>
            Save Project
          </Button>
        </Box>
      </Modal>
    </Box>
  )}


export default ProjectsTab;
