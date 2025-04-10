import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  Chip,
  Grid,
} from '@mui/material';
import { JobDescription, JobRequirement } from '../types';

interface JobDescriptionManagerProps {
  jobDescription: JobDescription;
  onSave: (jobDescription: JobDescription) => void;
}

const JobDescriptionManager: React.FC<JobDescriptionManagerProps> = ({
  jobDescription,
  onSave,
}) => {
  const [title, setTitle] = useState(jobDescription.title);
  const [department, setDepartment] = useState(jobDescription.department);
  const [location, setLocation] = useState(jobDescription.location);
  const [type, setType] = useState(jobDescription.type);
  const [summary, setSummary] = useState(jobDescription.summary);
  const [impact, setImpact] = useState<string[]>(jobDescription.impact);
  const [requirements, setRequirements] = useState<JobRequirement[]>(jobDescription.requirements);
  const [responsibilities, setResponsibilities] = useState<string[]>(jobDescription.responsibilities);
  const [benefits, setBenefits] = useState<string[]>(jobDescription.benefits);
  const [salary, setSalary] = useState(jobDescription.salary);
  const [teamSize, setTeamSize] = useState(jobDescription.teamSize);
  const [newItem, setNewItem] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'impact' | 'requirements' | 'responsibilities' | 'benefits'>('impact');

  const handleAddItem = () => {
    if (!newItem.trim()) return;

    switch (dialogType) {
      case 'impact':
        setImpact([...impact, newItem]);
        break;
      case 'requirements':
        const newRequirement: JobRequirement = {
          id: Date.now().toString(),
          text: newItem,
          type: 'must-have'
        };
        setRequirements([...requirements, newRequirement]);
        break;
      case 'responsibilities':
        setResponsibilities([...responsibilities, newItem]);
        break;
      case 'benefits':
        setBenefits([...benefits, newItem]);
        break;
    }

    setNewItem('');
    setDialogOpen(false);
  };

  const handleRemoveItem = (index: number, type: typeof dialogType) => {
    switch (type) {
      case 'impact':
        setImpact(impact.filter((_, i) => i !== index));
        break;
      case 'requirements':
        setRequirements(requirements.filter((_, i) => i !== index));
        break;
      case 'responsibilities':
        setResponsibilities(responsibilities.filter((_, i) => i !== index));
        break;
      case 'benefits':
        setBenefits(benefits.filter((_, i) => i !== index));
        break;
    }
  };

  const handleSave = () => {
    onSave({
      ...jobDescription,
      title,
      department,
      location,
      type,
      summary,
      impact,
      requirements,
      responsibilities,
      benefits,
      salary,
      teamSize,
    });
  };

  const openDialog = (type: typeof dialogType) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            margin="normal"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Impact
          <Button onClick={() => openDialog('impact')} sx={{ ml: 2 }}>
            Add Impact
          </Button>
        </Typography>
        <Paper sx={{ p: 2 }}>
          {impact.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => handleRemoveItem(index, 'impact')}
              sx={{ m: 0.5 }}
            />
          ))}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Requirements
          <Button onClick={() => openDialog('requirements')} sx={{ ml: 2 }}>
            Add Requirement
          </Button>
        </Typography>
        <Paper sx={{ p: 2 }}>
          {requirements.map((req, index) => (
            <Chip
              key={req.id}
              label={req.text}
              onDelete={() => handleRemoveItem(index, 'requirements')}
              color={req.type === 'must-have' ? 'primary' : 'default'}
              sx={{ m: 0.5 }}
            />
          ))}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Responsibilities
          <Button onClick={() => openDialog('responsibilities')} sx={{ ml: 2 }}>
            Add Responsibility
          </Button>
        </Typography>
        <Paper sx={{ p: 2 }}>
          {responsibilities.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => handleRemoveItem(index, 'responsibilities')}
              sx={{ m: 0.5 }}
            />
          ))}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Benefits
          <Button onClick={() => openDialog('benefits')} sx={{ ml: 2 }}>
            Add Benefit
          </Button>
        </Typography>
        <Paper sx={{ p: 2 }}>
          {benefits.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => handleRemoveItem(index, 'benefits')}
              sx={{ m: 0.5 }}
            />
          ))}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Salary Min"
              value={salary.min}
              onChange={(e) => setSalary({ ...salary, min: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Salary Max"
              value={salary.max}
              onChange={(e) => setSalary({ ...salary, max: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Currency"
              value={salary.currency}
              onChange={(e) => setSalary({ ...salary, currency: e.target.value })}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <TextField
          type="number"
          label="Team Size"
          value={teamSize}
          onChange={(e) => setTeamSize(Number(e.target.value))}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Job Description
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add {dialogType}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobDescriptionManager; 