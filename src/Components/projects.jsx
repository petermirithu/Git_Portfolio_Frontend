import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ProjectsTab = () => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState(Array(4).fill({}));
  const [newProject, setNewProject] = useState({ name: '', description: '', technologies: '', link: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddProject = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setNewProject({ name: '', description: '', technologies: '', link: '' });
  };

  const handleSaveProject = () => {
    if (editIndex !== null) {
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects];
        updatedProjects[editIndex] = newProject;
        return updatedProjects;
      });
      setEditIndex(null);
    } else {
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects];
        const emptyIndex = updatedProjects.findIndex((project) => Object.keys(project).length === 0);
        updatedProjects[emptyIndex] = newProject;
        return updatedProjects;
      });
    }
    setNewProject({ name: '', description: '', technologies: '', link: '' });
    handleClose();
  };

  const handleEditProject = (index) => {
    setEditIndex(index);
    setNewProject(projects[index]);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const renderTechnologies = (technologies) => {
    return technologies.split(',').map((tech, index) => (
      <span key={index} style={{ backgroundColor: getRandomColor(), padding: '2px', margin: '2px', borderRadius: '50%' }}>
        {tech.trim()}
      </span>
    ));
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '200px', // Adjust the margin based on the width of your sidebar
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {projects.map((project, index) => (
          <Card key={index} variant="outlined" sx={{ minWidth: 250, maxWidth: 250, m: 1 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {project.name || 'Project Name'}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {project.description || 'Add project'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {renderTechnologies(project.technologies || '')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.link || ''}
              </Typography>
              <Button variant="outlined" color="primary" onClick={() => handleEditProject(index)}>
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
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
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Technologies Used"
            variant="outlined"
            fullWidth
            margin="normal"
            name="technologies"
            value={newProject.technologies}
            onChange={handleInputChange}
          />
          <TextField
            label="GitHub Repository Link"
            variant="outlined"
            fullWidth
            margin="normal"
            name="link"
            value={newProject.link}
            onChange={handleInputChange}
          />

          <Button variant="contained" color="primary" onClick={handleSaveProject}>
            {editIndex !== null ? 'Update Project' : 'Save Project'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProjectsTab;
