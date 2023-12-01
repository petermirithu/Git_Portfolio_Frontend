import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Timeline from '@mui/lab/Timeline';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { CircularProgress, Typography } from '@mui/material';
import { add_experience, delete_experience, get_experiences, update_experience } from '../services/PortfolioService';
import { useSelector } from 'react-redux';

const ExperienceForm = () => {
  const didMount = useRef(false)
  const [experiences, setExperiences] = useState([]);
  const { profile } = useSelector((state) => state.userProfile);
  const [formData, setFormData] = useState({
    title: '',
    employmentType: '',
    companyName: '',
    location: '',
    locationType: '',
    currentlyWorking: false,
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    user_id: profile.id,
    experience_id: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const clearForm = () => {
    setFormData({
      title: '',
      employmentType: '',
      companyName: '',
      location: '',
      locationType: '',
      currentlyWorking: false,
      startDate: '',
      endDate: '',
      description: '',
      user_id: profile.id,
      experience_id: ''
    });
  }

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, currentlyWorking: event.target.checked, endDate: '' });
  };

  const handleEditExperience = (index) => {
    setEditIndex(index);
    setFormData(experiences[index]);
    toggleForm();
  };

  const handleDeleteExperience = async (index) => {
    if (confirm("Are your sure you want to delete this experience?")) {
      setIsLoading(true);
      const experienceId = experiences[index].id;
      await delete_experience(experienceId).then(response => {
        setIsLoading(false);
        alert("Successfully deleted the experience");        
        fetchExperiences()
      }).catch(error => {
        alert("Ooops! Something whent wrong while deleting your experience");
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.title?.length < 5) {
      alert("Please enter a valid title! Should me more than 5 characters.")
    }
    else if (formData.employmentType?.length < 2) {
      alert("Please select an employment type!")
    }
    else if (formData.companyName?.length < 5) {
      alert("Please enter a valid company name!")
    }
    else if (formData.location?.length < 5) {
      alert("Please enter a valid location! Should be more that 5 characters");
    }
    else if (formData.locationType?.length < 2) {
      alert("Please select a location type!")
    }
    else if (formData.startDate?.length < 5) {
      alert("Please enter a valid company name")
    }
    else if (formData.companyName?.length < 5) {
      alert("Please enter a valid company name")
    }
    else {
      setIsSubmitting(true);

      if (editIndex !== null) {
        let payload = { ...formData };
        payload.experience_id = experiences[editIndex].id;
        await update_experience(payload).then(response => {
          setIsSubmitting(false);
          alert("Successfully updated the experience.");          
          toggleForm();
          fetchExperiences()
        }).catch(error => {
          console.log(error);
          setIsSubmitting(false);
          alert("Ooops! Something whent wrong while updating your experience");
        })
        setEditIndex(null);
      }
      else {
        await add_experience(formData).then(response => {
          setIsSubmitting(false);
          alert("Successfully saved the Experience.");          
          toggleForm();          
          fetchExperiences()
        }).catch(error => {
          setIsSubmitting(false);
          alert("Ooops! Something whent wrong while saving the Experience");
        });
      }
    }

  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm==true){
      clearForm();
    }
  };

  const fetchExperiences = async () => {
    setIsLoading(true);
    await get_experiences(profile.id).then(async response => {
      setIsLoading(false);
      setExperiences(response.data);
    }).catch(error => {
      setIsLoading(false);
      alert("Ooops! Something went wrong while fetching the experiences")
    });
  }

  useEffect(() => {
    if (didMount.current == false) {
      didMount.current = true
      fetchExperiences();
    }
  }, [isLoading]);

  return (
    <Box
      component="div"
      style={{ margin: 30 }}
      minWidth={930}
    >
      {/* Add Experience Button */}
      <Button style={{ float: "right" }} variant="contained" color="primary" onClick={toggleForm}>
        Add Experience
      </Button>
      <Typography variant="h4" component="h4">Experiences</Typography>
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
        <>
          {experiences.length == 0 ?
            <>
              <Box
                component="div"
                width={920}
              >
                <Typography variant="body1">You have not added any experiences</Typography>
              </Box>
            </>
            :
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto',
              }}
            >
              {/* Display saved experiences in a timeline */}
              <Timeline style={{ width: '100%' }} position="alternate">
                {experiences.map((experience, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h5" component="h4">
                        {experience.title}
                      </Typography>
                      <Typography style={{marginBottom: 10}}><i>Company Name:</i> {experience.companyName}</Typography>
                      <Typography style={{marginBottom: 10}}><i>Location:</i> {experience.location}</Typography>
                      <Typography style={{marginBottom: 10}}><i>Location Type:</i> {experience.locationType}</Typography>
                      <Typography style={{marginBottom: 10}}><i>Employment Type:</i> {experience.employmentType}</Typography>
                      <Typography style={{marginBottom: 10}}><i>Working Period:</i> {experience.currentlyWorking ? 'Currently Working' : `${experience.startDate} to ${experience.endDate}`}</Typography>
                      <Typography style={{marginBottom: 10}}><i>Description:</i> {experience.description}</Typography>

                      <Button variant="outlined" onClick={() => handleEditExperience(index)}>
                        Edit
                      </Button>

                      <Button style={{ marginLeft: 10 }} variant="outlined" color='error' onClick={() => handleDeleteExperience(index)}>
                        Delete
                      </Button>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>

            </Box>
          }
        </>
      }

      {/* Form to Add New Experience */}
      <Dialog open={showForm} onClose={toggleForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Experience</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  value={formData.title}
                  onChange={handleChange('title')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="employmentTypeLabel">Employment Type</InputLabel>
                  <Select
                    labelId="employmentTypeLabel"
                    id="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange('employmentType')}
                  >
                    <MenuItem value="part-time">Part-Time</MenuItem>
                    <MenuItem value="FullTime">Full-Time</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                    <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                    <MenuItem value="Freelancer">Freelancer</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="seasonal">Seasonal</MenuItem>
                    <MenuItem value="Apprenticeship">Apprenticeship</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Company Name"
                  value={formData.companyName}
                  onChange={handleChange('companyName')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  value={formData.location}
                  onChange={handleChange('location')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="locationTypeLabel">Location Type</InputLabel>
                  <Select
                    labelId="locationTypeLabel"
                    id="locationType"
                    value={formData.locationType}
                    onChange={handleChange('locationType')}
                  >
                    <MenuItem value="onsite">Onsite</MenuItem>
                    <MenuItem value="remote">Remote</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <label>
                  <Checkbox
                    checked={formData.currentlyWorking}
                    onChange={handleCheckboxChange}
                  />
                  I am currently working on this role
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange('startDate')}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="End Date"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange('endDate')}
                  disabled={formData.currentlyWorking}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange('description')}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForm} color="primary">
            Cancel
          </Button>
          <Button disabled={isSubmitting} variant="contained" color="primary" onClick={handleSubmit}>
            {isSubmitting ?
              <>
                {editIndex !== null ? 'Updating Project ...' : "Saving Experience ..."}
              </>
              :
              <>
                {editIndex !== null ? 'Update Project' : 'Save Experience'}
              </>
            }
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExperienceForm;
