import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import MailIcon from '@mui/icons-material/Mail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Navbar from '../../Components/navbar';
import Sidebar from '../../Components/Sidebar';



export default function NavigationTabs() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <>
     <Navbar/>
    <Sidebar/>
  
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="40vh"
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs"
        sx={{ width: '450px', textAlign: 'center' }}
      >
        <Tab icon={<CodeIcon />} label="Skills" />
        <Tab icon={<WorkIcon />} label="Projects" />
        <Tab icon={<MailIcon />} label="Contact" />
        <Tab icon={<ContactPhoneIcon />} label="Experience" />
      </Tabs>

      {value === 0 && (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Enter your skills" multiline rows={4} variant="outlined" />
        </Box>
      )}

      {value === 1 && (
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

      {value === 2 && (
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
      )}

      {value === 3 && (
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
      )}
    </Box>
    </>
  );
}
