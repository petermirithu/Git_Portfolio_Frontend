import React, { useState } from 'react';
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

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    employmentType: '',
    companyName: '',
    location: '',
    locationType: '',
    currentlyWorking: false,
    startDate: '',
    endDate: '',
    description: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, currentlyWorking: event.target.checked, endDate: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setExperiences([...experiences, formData]);
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
    });
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        maxWidth: '600px',
      }}
    >
      {/* Display saved experiences in a timeline */}
      <Timeline style={{ width: '100%', marginTop: '16px' }}>
        {experiences.map((experience, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div>
                <h3>{experience.title}</h3>
                <p>{experience.employmentType}</p>
                <p>{experience.companyName}</p>
                <p>{experience.location}</p>
                <p>{experience.locationType}</p>
                <p>{experience.currentlyWorking ? 'Currently Working' : `${experience.startDate} to ${experience.endDate}`}</p>
                <p>{experience.description}</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {/* Add Experience Button */}
      <Button onClick={toggleForm} variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Add Experience
      </Button>

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
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExperienceForm;
