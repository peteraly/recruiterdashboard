import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Rating,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Upload as UploadIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { Candidate, JobDescription, ReviewPhase1Data, ReviewPhase2Data, ReviewCriteria } from '../types';
import ResumeAnalysisWorkflow from './ResumeAnalysisWorkflow';

// Mock data for initial development
const mockJobDescription: JobDescription = {
  id: '1',
  title: 'Senior Software Engineer',
  department: 'Engineering',
  location: 'San Francisco, CA',
  type: 'Full-time',
  salary: {
    min: 120000,
    max: 180000,
    currency: 'USD'
  },
  summary: 'We are looking for a Senior Software Engineer to join our team and help build the next generation of our platform.',
  impact: [
    'Lead the development of core platform features',
    'Mentor junior engineers and promote best practices',
    'Drive technical architecture decisions'
  ],
  requirements: [
    {
      id: '1',
      text: '5+ years experience',
      type: 'must-have'
    },
    {
      id: '2',
      text: 'React',
      type: 'must-have'
    },
    {
      id: '3',
      text: 'TypeScript',
      type: 'must-have'
    },
    {
      id: '4',
      text: 'AWS certification',
      type: 'nice-to-have'
    },
    {
      id: '5',
      text: 'Open source contributions',
      type: 'nice-to-have'
    }
  ],
  responsibilities: ['Lead development team', 'Code review', 'Architecture design'],
  benefits: [
    'Competitive salary',
    'Health insurance',
    'Flexible work hours',
    'Remote work options'
  ],
  teamSize: 8,
  videoUrl: 'https://example.com/team-video',
  status: 'Active'
};

const mockCandidate: Candidate = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '123-456-7890',
  resumeUrl: 'https://example.com/resume.pdf',
  status: 'New',
  phase1Score: 0,
  phase2Score: 0,
  notes: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ResumeAnalysisSystem: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([mockJobDescription]);
  const [candidates, setCandidates] = useState<Candidate[]>([mockCandidate]);
  const [selectedJob, setSelectedJob] = useState<string>(mockJobDescription.id);
  const [selectedResume, setSelectedResume] = useState<string>(mockCandidate.id);

  const steps = [
    'Job Description Management',
    'Resume Upload',
    'Quick Assessment',
    'Detailed Evaluation',
    'Final Classification'
  ];

  const handleJobDescriptionSave = (jobDescription: JobDescription) => {
    setJobDescriptions(prev => 
      prev.map(job => job.id === jobDescription.id ? jobDescription : job)
    );
  };

  const handleCandidateSave = (candidate: Candidate) => {
    setCandidates(prev => 
      prev.map(cand => cand.id === candidate.id ? candidate : cand)
    );
  };

  const selectedJobDescription = jobDescriptions.find(job => job.id === selectedJob);
  const selectedCandidate = candidates.find(cand => cand.id === selectedResume);

  const calculateTotalScore = (phase2Data: ReviewPhase2Data) => {
    let totalWeight = 0;
    let totalScore = 0;

    Object.entries(phase2Data).forEach(([category, criteria]) => {
      Object.entries(criteria).forEach(([field, data]) => {
        const criteriaData = data as ReviewCriteria;
        totalWeight += criteriaData.weight;
        totalScore += criteriaData.weight * criteriaData.rating;
      });
    });

    return totalWeight > 0 ? (totalScore / totalWeight) * 20 : 0;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select Job Description
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Job Description</InputLabel>
            <Select
              value={selectedJob}
              label="Job Description"
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              {jobDescriptions.map(job => (
                <MenuItem key={job.id} value={job.id}>
                  {job.title} - {job.department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedJobDescription && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Requirements
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {selectedJobDescription.requirements.map((req, index) => (
                  <Chip 
                    key={req.id} 
                    label={req.text} 
                    color={req.type === 'must-have' ? 'primary' : 'default'}
                  />
                ))}
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                Responsibilities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {selectedJobDescription.responsibilities.map((resp, index) => (
                  <Chip key={index} label={resp} />
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      )}

      {activeStep === 1 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select Resume
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Resume</InputLabel>
            <Select
              value={selectedResume}
              label="Resume"
              onChange={(e) => setSelectedResume(e.target.value)}
            >
              {candidates.map(candidate => (
                <MenuItem key={candidate.id} value={candidate.id}>
                  {candidate.name} - {candidate.status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedCandidate && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Candidate Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={selectedCandidate.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={selectedCandidate.phone}
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      )}

      {activeStep >= 2 && selectedJobDescription && selectedCandidate && (
        <ResumeAnalysisWorkflow
          onSave={(phase1Data, phase2Data) => {
            const updatedCandidate = {
              ...selectedCandidate,
              phase1Score: Object.values(phase1Data).filter(Boolean).length * 25,
              phase2Score: calculateTotalScore(phase2Data),
              notes: selectedCandidate.notes,
            };
            handleCandidateSave(updatedCandidate);
          }}
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep((prev) => prev + 1)}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ResumeAnalysisSystem; 