import React, { useEffect, useRef, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { add_skill, delete_skill, get_skills, update_skill } from '../services/PortfolioService';
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CustomTimeline = () => {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newEntry, setNewEntry] = useState('');
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const didMount = useRef(false)
  const { profile } = useSelector((state) => state.userProfile);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const randomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleOpen = (entry) => {
    setSelectedEntry(entry);
    setNewEntry(entry ? entry.label : '');
    setFormError(false);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedEntry(null);
    setNewEntry('');
    setFormError(false);
    setOpen(false);
  };

  const handleSaveEntry = async () => {
    if (!newEntry.trim()) {
      setFormError(true);
      return;
    }

    const updatedEntries = [...entries];
    if (selectedEntry) {
      setIsSubmitting(true);

      const payload = {
        name: newEntry,
        skill_id: selectedEntry.id
      }

      await update_skill(payload).then(response => {
        setIsSubmitting(false);
        alert("Successfully updated the skill.");
        handleClose();
        fetchSkills()
      }).catch(error => {
        setIsSubmitting(false);
        alert("Ooops! Something whent wrong while updated your skill");
      })
    }
    else {
      const payload = {
        name: newEntry,
        user_id: profile.id
      }

      setIsSubmitting(true);

      await add_skill(payload).then(response => {
        setIsSubmitting(false);
        alert("Successfully saved the skill.");
        handleClose();
        fetchSkills()
      }).catch(error => {
        setIsSubmitting(false);
        alert("Ooops! Something whent wrong while saving your skill");
      })
    }

    setEntries(updatedEntries);
    setNewEntry('');
    setFormError(false);
    handleClose();
  };

  const handleDeleteEntry = async () => {
    if (confirm("Are your sure you want to delete this skill?")) {
      setIsLoading(true);

      await delete_skill(selectedEntry.id).then(response => {
        setIsLoading(false);
        alert("Successfully deleted the skill");
        handleClose();
        fetchSkills()
      }).catch(error => {
        setIsLoading(false);
        alert("Ooops! Something whent wrong while deleting your skill");
      });
    }

  };


  const fetchSkills = async () => {
    setIsLoading(true);
    await get_skills(profile.id).then(async response => {
      setIsLoading(false);
      for (let index = 0; index < response.data?.length; index++) {
        const skill = response.data[index];
        response.data[index] = { id: skill.id, label: skill.name, color: randomColor() };
      }
      setEntries(response.data);
    }).catch(error => {
      setIsLoading(false);
      alert("Ooops! Something went wrong while fetching the skills")
    });
  }


  useEffect(() => {
    if (didMount.current == false) {
      didMount.current = true
      fetchSkills();
    }
  }, [isLoading, entries]);

  return (
    <Box
      component="div"
      style={{ margin: 30 }}
      minWidth={930}
    >
      <Button style={{ float: "right" }} variant="contained" color="primary" onClick={() => handleOpen(null)}>
        Add Skill
      </Button>
      <Typography variant="h4" component="h4">Skills</Typography>
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
        <div>
          {entries.length == 0 ?
            <>
              <Box
                component="div"
                width={920}
              >
                <Typography variant="body1">You have not added any skills</Typography>
              </Box>
            </>
            :
            <>
              <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                }}
              >
                {entries.map((entry) => (
                  <TimelineItem key={entry.id}>
                    <TimelineSeparator>
                      <TimelineDot color={entry.color} />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent onClick={() => handleOpen(entry)}>
                      <Chip label={entry.label} color={entry.color} />
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </>
          }

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{selectedEntry ? 'Edit' : 'Add'} a skill</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To {selectedEntry ? 'Edit' : 'Add'} a skill, please fill in the form below all details required.
              </DialogContentText>
              <TextField
                label="Label"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                error={formError}
                helperText={formError ? 'Label cannot be empty' : ''}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {selectedEntry && (
                <Button variant="outlined" color="secondary" onClick={handleDeleteEntry}>
                  Delete
                </Button>
              )}

              <Button disabled={isSubmitting} variant="contained" color="primary" onClick={handleSaveEntry}>
                {isSubmitting ?
                  <>
                    Saving Skill ...
                  </>
                  :
                  <>
                    Save Skill
                  </>
                }
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      }
    </Box>
  );
};

export default CustomTimeline;
