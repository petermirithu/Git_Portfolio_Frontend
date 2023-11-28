import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const SkillsTab = () => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [progressValues, setProgressValues] = useState({});
  const [selectedSkill, setSelectedSkill] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [formError, setFormError] = useState(false);

  const handleOpen = (skill) => {
    setSelectedSkill(skill);
    setNewSkill(skill);
    setFormError(false);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedSkill('');
    setNewSkill('');
    setFormError(false);
    setOpen(false);
  };

  const handleSaveSkills = () => {
    if (!newSkill.trim()) {
      setFormError(true);
      return;
    }

    const updatedSkills = [...skills];
    if (selectedSkill) {
      const index = updatedSkills.indexOf(selectedSkill);
      if (index !== -1) {
        updatedSkills[index] = newSkill;
        setProgressValues((prevValues) => ({
          ...prevValues,
          [newSkill]: prevValues[selectedSkill],
          [selectedSkill]: prevValues[selectedSkill] || 0,
        }));
      }
    } else {
      updatedSkills.push(newSkill);
      setProgressValues((prevValues) => ({
        ...prevValues,
        [newSkill]: prevValues[selectedSkill] || 0,
      }));
    }

    setSkills(updatedSkills);
    setNewSkill('');
    setFormError(false);
    handleClose();
  };

  const handleDeleteSkill = () => {
    const updatedSkills = skills.filter((skill) => skill !== selectedSkill);
    setSkills(updatedSkills);
    setProgressValues((prevValues) => {
      const { [selectedSkill]: _, ...rest } = prevValues;
      return rest;
    });
    handleClose();
  };

  const handleSliderChange = (event, value) => {
    setProgressValues((prevValues) => ({
      ...prevValues,
      [newSkill]: value,
    }));
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      {skills.map((skill, index) => (
        <Box key={index} sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
          <Chip
            label={`${skill} - ${progressValues[skill] || 0}%`}
            color="primary"
            onClick={() => handleOpen(skill)}
            sx={{ m: 0.5, cursor: 'pointer' }}
            onDelete={() => handleDeleteSkill(skill)}
          />
          <Slider
            value={progressValues[skill] || 0}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            sx={{ width: '50%', margin: 'auto', color: 'primary.main' }}
          />
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={() => handleOpen('')}>
        Add/Edit Skills
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
          <Typography gutterBottom>
            {selectedSkill ? `Adjust the proficiency level for ${selectedSkill}:` : 'Enter a new skill to add:'}
          </Typography>
          {selectedSkill && (
            <>
              <Slider
                value={progressValues[newSkill] || 0}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
                sx={{ width: '70%', margin: 'auto', color: 'primary.main' }}
              />
              <Typography variant="h6" gutterBottom>
                {progressValues[newSkill] || 0}%
              </Typography>
              <Button variant="outlined" color="secondary" onClick={handleDeleteSkill}>
                Delete
              </Button>
            </>
          )}
          {!selectedSkill && (
            <TextField
              label="Skill"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              error={formError}
              helperText={formError ? 'Skill name cannot be empty' : ''}
            />
          )}
          <Button variant="contained" color="primary" onClick={handleSaveSkills}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SkillsTab;
