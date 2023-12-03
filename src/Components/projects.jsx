import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { add_project, delete_project, get_projects, update_project } from '../services/PortfolioService';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectsTab = () => {
  const didMount = useRef(false)
  const { profile } = useSelector((state) => state.userProfile);
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    link: '',
    user_id: profile.id,
    project_id: ''
  });

  const handleAddProject = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setNewProject({
      name: '',
      description: '',
      technologies: '',
      link: '',
      user_id: profile.id,
      project_id: ''
    });
  };

  const handleSaveProject = async () => {
    if (newProject.name?.length < 5) {
      alert("Please enter a valid project name! Should me more than 5 characters.")
    }
    else if (newProject.description?.length < 10) {
      alert("Please enter a valid project description! Should me more than 10 characters.")
    }
    else if (newProject.technologies?.length < 2) {
      alert("Please enter valid project technologies! Should me more than 2 characters.")
    }
    else if (newProject.link?.length < 5) {
      alert("Please enter a valid project link! Should me more than 5 characters.")
    }
    else {
      setIsSubmitting(true);
      if (editIndex !== null) {
        let payload = { ...newProject };
        payload.project_id = projects[editIndex].id;
        await update_project(payload).then(response => {
          setIsSubmitting(false);
          alert("Successfully updated the project.");
          handleClose();
          fetchProjects()
        }).catch(error => {
          setIsSubmitting(false);
          alert("Ooops! Something whent wrong while updating your project");
        })
        setEditIndex(null);
      }
      else {
        await add_project(newProject).then(response => {
          setIsSubmitting(false);
          alert("Successfully saved the project.");
          handleClose();
          fetchProjects()
        }).catch(error => {
          setIsSubmitting(false);
          if (error.response.data == "nameTaken") {
            alert("Ooops! Seems like the project name you entered is taken.");
          }
          else {
            alert("Ooops! Something whent wrong while saving your project");
          }
        })
      }
    }
  };

  const handleEditProject = (index) => {
    setEditIndex(index);
    setNewProject(projects[index]);
    setOpen(true);
  };

  const handleDeleteProject = async (index) => {
    if (confirm("Are your sure you want to delete this project?")) {
      setIsLoading(true);
      const projectId = projects[index].id;
      await delete_project(projectId).then(response => {
        setIsLoading(false);
        alert("Successfully deleted the project");
        fetchProjects()
      }).catch(error => {
        alert("Ooops! Something whent wrong while deleting your project");
      });
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const renderTechnologies = (technologies) => {
    return technologies.split(',').map((tech, index) => (      
      <Chip key={index} label={tech.trim()} color={randomColor()} />      
    ));
  };

  const randomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    await get_projects(profile.id).then(async response => {
      setIsLoading(false);
      console.log(response.data)
      setProjects(response.data);
    }).catch(error => {
      setIsLoading(false);
      alert("Ooops! Something went wrong while fetching the projects")
    });
  }

  useEffect(() => {
    if (didMount.current == false) {
      didMount.current = true
      fetchProjects();
    }
  }, [isLoading, projects]);

  return (
    <Box
      component="div"
      style={{ margin: 30 }}
      minWidth={930}
    >
      <Button style={{ float: "right" }} variant="contained" color="primary" onClick={handleAddProject}>
        Add Project
      </Button>
      <Typography variant="h4" component="h4">Projects</Typography>
      <br />
      <br />

      {(isLoading != false) ?
        <Box
          component="div"          
        >
          <CircularProgress />
          <Typography variant="body1">Loading ...</Typography>
        </Box>
        :

        
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems:'flex-start',
            '& > :not(style)': { m: 0 },
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: 3,
            }}
          >
            {projects.length == 0 ?
              <>
                <Box
                  component="div"
                  width={920}
                >
                  <Typography variant="body1">You have not added any project</Typography>
                </Box>
              </>
              :
              <>
                {projects.map((project, index) => (
                  <Card key={index} variant="outlined" sx={{ width: 460 }}>
                    <CardContent>
                      <Box style={{ float: "right", display: "flex", flexWrap: "nowrap", gap: "5px" }}>
                        <Button variant="text" onClick={() => handleEditProject(index)}>
                          <EditIcon className="icon" />
                        </Button>
                        <Button variant="text" onClick={() => handleDeleteProject(index)}>
                          <DeleteIcon className="icon" />
                        </Button>
                      </Box>
                      <Typography variant="h6" component="div">
                        {project.name || 'Project Name'}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {project.description || 'Add project'}
                      </Typography>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {renderTechnologies(project.technologies || '')}
                      </div>
                      <br />

                      <Typography variant="body2" color="text.secondary">
                        <Link href={project.link || ''} underline="none" rel="noopener" target="_blank">
                          {project.link || ''}
                        </Link>
                      </Typography>                      
                    </CardContent>
                  </Card>
                ))}
              </>
            }
          </Box>
        </Box>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a project, please fill in the form below all details required.
          </DialogContentText>

          <TextField
            key={"projectName"}
            autoFocus
            label="Project Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
          />
          <TextField
            key={"projectDescription"}
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
            key={"technologiesUsed"}
            label="Technologies Used. Seperate using a Comma"
            variant="outlined"
            fullWidth
            margin="normal"
            name="technologies"
            value={newProject.technologies}
            onChange={handleInputChange}
          />
          <TextField
            key={"gitlink"}
            label="GitHub Repository Link"
            variant="outlined"
            fullWidth
            margin="normal"
            name="link"
            value={newProject.link}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isSubmitting} variant="contained" color="primary" onClick={handleSaveProject}>
            {isSubmitting ?
              <>
                {editIndex !== null ? 'Updating Project ...' : "Saving Project ..."}
              </>
              :
              <>
                {editIndex !== null ? 'Update Project' : 'Save Project'}
              </>
            }
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectsTab;