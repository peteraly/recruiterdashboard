import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import { JobDescription, Candidate } from '../types';

interface JobAndCandidateManagerProps {
  jobDescriptions: JobDescription[];
  candidates: Candidate[];
  onJobDescriptionAdd: (jobDescription: JobDescription) => void;
  onJobDescriptionEdit: (jobDescription: JobDescription) => void;
  onJobDescriptionDelete: (id: string) => void;
  onCandidateAdd: (candidate: Candidate) => void;
  onCandidateEdit: (candidate: Candidate) => void;
  onCandidateDelete: (id: string) => void;
}

const JobAndCandidateManager: React.FC<JobAndCandidateManagerProps> = ({
  jobDescriptions,
  candidates,
  onJobDescriptionAdd,
  onJobDescriptionEdit,
  onJobDescriptionDelete,
  onCandidateAdd,
  onCandidateEdit,
  onCandidateDelete,
}) => {
  const [jobDialogOpen, setJobDialogOpen] = useState(false);
  const [candidateDialogOpen, setCandidateDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobDescription | null>(null);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [newJobData, setNewJobData] = useState<Partial<JobDescription>>({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: { min: 0, max: 0, currency: 'USD' },
    summary: '',
    impact: [],
    requirements: [],
    responsibilities: [],
    benefits: [],
    teamSize: 0,
  });
  const [newCandidateData, setNewCandidateData] = useState<Partial<Candidate>>({
    name: '',
    email: '',
    phone: '',
    resumeUrl: '',
    status: 'New',
    phase1Score: 0,
    phase2Score: 0,
    notes: '',
  });

  const handleJobDialogOpen = (job?: JobDescription) => {
    if (job) {
      setEditingJob(job);
      setNewJobData(job);
    } else {
      setEditingJob(null);
      setNewJobData({
        title: '',
        department: '',
        location: '',
        type: '',
        salary: { min: 0, max: 0, currency: 'USD' },
        summary: '',
        impact: [],
        requirements: [],
        responsibilities: [],
        benefits: [],
        teamSize: 0,
      });
    }
    setJobDialogOpen(true);
  };

  const handleCandidateDialogOpen = (candidate?: Candidate) => {
    if (candidate) {
      setEditingCandidate(candidate);
      setNewCandidateData(candidate);
    } else {
      setEditingCandidate(null);
      setNewCandidateData({
        name: '',
        email: '',
        phone: '',
        resumeUrl: '',
        status: 'New',
        phase1Score: 0,
        phase2Score: 0,
        notes: '',
      });
    }
    setCandidateDialogOpen(true);
  };

  const handleJobSave = () => {
    const jobData = {
      id: editingJob?.id || Date.now().toString(),
      ...newJobData,
    } as JobDescription;

    if (editingJob) {
      onJobDescriptionEdit(jobData);
    } else {
      onJobDescriptionAdd(jobData);
    }
    setJobDialogOpen(false);
  };

  const handleCandidateSave = () => {
    const candidateData = {
      id: editingCandidate?.id || Date.now().toString(),
      createdAt: editingCandidate?.createdAt || new Date(),
      updatedAt: new Date(),
      ...newCandidateData,
    } as Candidate;

    if (editingCandidate) {
      onCandidateEdit(candidateData);
    } else {
      onCandidateAdd(candidateData);
    }
    setCandidateDialogOpen(false);
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to a server
      // For now, we'll just create a local URL
      const resumeUrl = URL.createObjectURL(file);
      setNewCandidateData({ ...newCandidateData, resumeUrl });
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Job Descriptions Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Job Descriptions</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleJobDialogOpen()}
            >
              Add Job Description
            </Button>
          </Box>
          <Grid container spacing={2}>
            {jobDescriptions.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {job.department} - {job.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {job.summary}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {job.requirements.map((req) => (
                        <Chip
                          key={req.id}
                          label={req.text}
                          size="small"
                          color={req.type === 'must-have' ? 'primary' : 'default'}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleJobDialogOpen(job)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onJobDescriptionDelete(job.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Candidates Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Candidates</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleCandidateDialogOpen()}
            >
              Add Candidate
            </Button>
          </Box>
          <Grid container spacing={2}>
            {candidates.map((candidate) => (
              <Grid item xs={12} md={6} key={candidate.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{candidate.name}</Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {candidate.email} - {candidate.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Status: {candidate.status}
                    </Typography>
                    <Typography variant="body2">
                      Scores: Phase 1 - {candidate.phase1Score}%, Phase 2 - {candidate.phase2Score}%
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleCandidateDialogOpen(candidate)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onCandidateDelete(candidate.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Job Description Dialog */}
      <Dialog open={jobDialogOpen} onClose={() => setJobDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingJob ? 'Edit Job Description' : 'Add New Job Description'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                value={newJobData.title}
                onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Department"
                value={newJobData.department}
                onChange={(e) => setNewJobData({ ...newJobData, department: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={newJobData.location}
                onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Type"
                value={newJobData.type}
                onChange={(e) => setNewJobData({ ...newJobData, type: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Summary"
                value={newJobData.summary}
                onChange={(e) => setNewJobData({ ...newJobData, summary: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJobDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleJobSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Candidate Dialog */}
      <Dialog open={candidateDialogOpen} onClose={() => setCandidateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={newCandidateData.name}
                onChange={(e) => setNewCandidateData({ ...newCandidateData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={newCandidateData.email}
                onChange={(e) => setNewCandidateData({ ...newCandidateData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={newCandidateData.phone}
                onChange={(e) => setNewCandidateData({ ...newCandidateData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newCandidateData.status}
                  label="Status"
                  onChange={(e) => setNewCandidateData({ ...newCandidateData, status: e.target.value as any })}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="In Review">In Review</MenuItem>
                  <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Hired">Hired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
              >
                Upload Resume
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
              </Button>
              {newCandidateData.resumeUrl && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Resume uploaded
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={newCandidateData.notes}
                onChange={(e) => setNewCandidateData({ ...newCandidateData, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCandidateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCandidateSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobAndCandidateManager; 