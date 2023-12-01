import React, { useState } from 'react';
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

const CustomTimeline = () => {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newEntry, setNewEntry] = useState('');
  const [formError, setFormError] = useState(false);

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

  const handleSaveEntry = () => {
    if (!newEntry.trim()) {
      setFormError(true);
      return;
    }

    const updatedEntries = [...entries];
    if (selectedEntry) {
      const index = updatedEntries.findIndex((entry) => entry.id === selectedEntry.id);
      if (index !== -1) {
        updatedEntries[index] = { ...selectedEntry, label: newEntry, color: randomColor() };
      }
    } else {
      const newId = entries.length > 0 ? entries[entries.length - 1].id + 1 : 1;
      updatedEntries.push({ id: newId, label: newEntry, color: randomColor() });
    }

    setEntries(updatedEntries);
    setNewEntry('');
    setFormError(false);
    handleClose();
  };

  const handleDeleteEntry = () => {
    const updatedEntries = entries.filter((entry) => entry.id !== selectedEntry.id);
    setEntries(updatedEntries);
    handleClose();
  };

  return (
    <div>
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
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
        Add Skills
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'white', boxShadow: 24, p: 4 }}>
          <Typography gutterBottom>
            {selectedEntry ? 'Edit Entry:' : 'Add New Entry:'}
          </Typography>
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
          <Button variant="contained" color="primary" onClick={handleSaveEntry}>
            Save
          </Button>
          {selectedEntry && (
            <Button variant="outlined" color="secondary" onClick={handleDeleteEntry}>
              Delete
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CustomTimeline;
