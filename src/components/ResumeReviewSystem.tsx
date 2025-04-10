import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Rating,
  Chip,
  Divider,
} from '@mui/material';
import { Candidate, JobDescription, CandidateStatus } from '../types';

interface ResumeReviewSystemProps {
  candidate: Candidate;
  jobDescription: JobDescription;
  onComplete: (candidate: Candidate) => void;
}

const steps = [
  'Initial Screening',
  'Technical Assessment',
  'Experience Review',
  'Final Decision'
];

const ResumeReviewSystem: React.FC<ResumeReviewSystemProps> = ({
  candidate,
  jobDescription,
  onComplete,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [notes, setNotes] = useState<string>(candidate.notes || '');
  const [phase1Score, setPhase1Score] = useState<number>(candidate.phase1Score || 0);
  const [phase2Score, setPhase2Score] = useState<number>(candidate.phase2Score || 0);
  const [status, setStatus] = useState<CandidateStatus>(candidate.status || 'New');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    const updatedCandidate: Candidate = {
      ...candidate,
      notes,
      phase1Score,
      phase2Score,
      status,
      updatedAt: new Date(),
    };
    onComplete(updatedCandidate);
  };

  const renderInitialScreening = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Basic Information Review
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Name"
            value={candidate.name}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            value={candidate.email}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Resume Match Score
          </Typography>
          <Rating
            value={phase1Score / 20}
            onChange={(_, value) => setPhase1Score((value || 0) * 20)}
            max={5}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Initial Screening Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderTechnicalAssessment = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Technical Skills Evaluation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Required Skills Match
          </Typography>
          {jobDescription.requirements
            .filter(req => req.type === 'must-have')
            .map((req) => (
              <Chip
                key={req.id}
                label={req.text}
                color="primary"
                sx={{ m: 0.5 }}
              />
            ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Technical Assessment Score
          </Typography>
          <Rating
            value={phase2Score / 20}
            onChange={(_, value) => setPhase2Score((value || 0) * 20)}
            max={5}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Technical Assessment Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderExperienceReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Experience and Background Check
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Key Responsibilities Match
          </Typography>
          {jobDescription.responsibilities.map((resp, index) => (
            <Chip
              key={index}
              label={resp}
              sx={{ m: 0.5 }}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={status === 'Shortlisted'}
                onChange={(e) => setStatus(e.target.checked ? 'Shortlisted' : 'In Review')}
              />
            }
            label="Shortlist Candidate"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Experience Review Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderFinalDecision = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Final Review and Decision
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Overall Assessment
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>Initial Screening Score: {phase1Score}%</Typography>
            <Typography>Technical Assessment Score: {phase2Score}%</Typography>
            <Typography>Current Status: {status}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Final Decision Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderInitialScreening();
      case 1:
        return renderTechnicalAssessment();
      case 2:
        return renderExperienceReview();
      case 3:
        return renderFinalDecision();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Resume Review Process
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Candidate: {candidate.name} | Position: {jobDescription.title}
        </Typography>
      </Paper>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3, mb: 3 }}>
        {getStepContent(activeStep)}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Box>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ mr: 1 }}
          >
            Save Progress
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResumeReviewSystem; 