import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Rating,
  Slider,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import {
  Candidate,
  JobDescription,
  ReviewPhase1Data,
  ReviewPhase2Data,
  CandidateStatus,
  ReviewCriteria,
} from '../types';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

interface StructuredResumeReviewProps {
  candidate: Candidate;
  jobDescription: JobDescription;
  onSave: (candidate: Candidate) => void;
}

const StructuredResumeReview: React.FC<StructuredResumeReviewProps> = ({
  candidate,
  jobDescription,
  onSave,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [phase1Data, setPhase1Data] = useState<ReviewPhase1Data>({
    education: false,
    experience: false,
    technical: false,
    careerStability: false,
  });
  const [phase2Data, setPhase2Data] = useState<ReviewPhase2Data>({
    experience: {
      relevantRole: { weight: 5, rating: 0, notes: '' },
      fastPaced: { weight: 4, rating: 0, notes: '' },
      matrixOrg: { weight: 3, rating: 0, notes: '' },
    },
    skills: {
      programManagement: { weight: 5, rating: 0, notes: '' },
      collaboration: { weight: 4, rating: 0, notes: '' },
      problemSolving: { weight: 4, rating: 0, notes: '' },
      communication: { weight: 4, rating: 0, notes: '' },
    },
    knowledge: {
      agile: { weight: 3, rating: 0, notes: '' },
      productDev: { weight: 3, rating: 0, notes: '' },
    },
    workStyle: {
      selfMotivated: { weight: 3, rating: 0, notes: '' },
      detailOriented: { weight: 3, rating: 0, notes: '' },
      adaptable: { weight: 3, rating: 0, notes: '' },
    },
  });
  const [redFlags, setRedFlags] = useState<string[]>([]);
  const [greenFlags, setGreenFlags] = useState<string[]>([]);
  const [interviewNotes, setInterviewNotes] = useState('');

  const steps = [
    'Phase 1: Quick Assessment',
    'Phase 2: Detailed Evaluation',
    'Phase 3: Red/Green Flags',
    'Phase 4: Interview Preparation',
  ];

  const handlePhase1Change = (field: keyof typeof phase1Data) => {
    setPhase1Data(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePhase2Change = (
    category: keyof ReviewPhase2Data,
    field: string,
    value: number | string,
    type: 'rating' | 'notes'
  ) => {
    setPhase2Data(prev => {
      const newData = { ...prev };
      const categoryData = newData[category];
      const fieldData = categoryData[field as keyof typeof categoryData] as ReviewCriteria;
      
      if (type === 'rating' && typeof value === 'number') {
        fieldData.rating = value;
      } else if (type === 'notes' && typeof value === 'string') {
        fieldData.notes = value;
      }
      
      return newData;
    });
  };

  const calculateTotalScore = () => {
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

  const getClassification = (score: number): CandidateStatus => {
    if (score >= 80) return 'Shortlisted';
    if (score >= 60) return 'In Review';
    if (score >= 40) return 'In Review';
    return 'Rejected';
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    const updatedCandidate: Candidate = {
      ...candidate,
      phase1Score: Object.values(phase1Data).filter(Boolean).length * 25,
      phase2Score: calculateTotalScore(),
      notes: interviewNotes,
      status: getClassification(calculateTotalScore()),
    };
    onSave(updatedCandidate);
  };

  const renderPhase1 = () => (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Quick Assessment (60-90 seconds)
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        Must-Have Criteria
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={phase1Data.education}
                onChange={() => handlePhase1Change('education')}
              />
            }
            label="Education: Required degree/certification (Bachelor's degree minimum)"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={phase1Data.experience}
                onChange={() => handlePhase1Change('experience')}
              />
            }
            label="Experience: 5+ years of relevant experience"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={phase1Data.technical}
                onChange={() => handlePhase1Change('technical')}
              />
            }
            label="Technical Requirements: Essential skills for role"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={phase1Data.careerStability}
                onChange={() => handlePhase1Change('careerStability')}
              />
            }
            label="Career Stability: No concerning job-hopping pattern"
          />
        </Grid>
      </Grid>
    </StyledPaper>
  );

  const renderPhase2 = () => (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Detailed Evaluation (5-7 minutes)
      </Typography>
      {(Object.entries(phase2Data) as [keyof ReviewPhase2Data, ReviewPhase2Data[keyof ReviewPhase2Data]][]).map(([category, criteria]) => (
        <Box key={category} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(criteria).map(([field, data]) => {
              const criteriaData = data as ReviewCriteria;
              return (
                <Grid item xs={12} key={field}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ flex: 1 }}>
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Weight: {criteriaData.weight}
                    </Typography>
                    <Rating
                      value={criteriaData.rating}
                      onChange={(_, value) =>
                        handlePhase2Change(category, field, value || 0, 'rating')
                      }
                    />
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={1}
                    placeholder="Notes"
                    value={criteriaData.notes}
                    onChange={(e) =>
                      handlePhase2Change(category, field, e.target.value, 'notes')
                    }
                    sx={{ mt: 1 }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">
        Total Score: {calculateTotalScore().toFixed(1)}%
      </Typography>
      <Typography variant="subtitle1">
        Classification: {getClassification(calculateTotalScore())}
      </Typography>
    </StyledPaper>
  );

  const renderPhase3 = () => (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Red Flags & Green Flags
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="error">
            Red Flags
          </Typography>
          <List>
            {[
              'Unexplained employment gaps',
              'Declining responsibility in career progression',
              'Lack of specific achievements/results',
              'Inconsistencies or errors in resume',
              'Misalignment with company culture/values',
            ].map((flag) => (
              <ListItem key={flag}>
                <ListItemIcon>
                  <WarningIcon color="error" />
                </ListItemIcon>
                <ListItemText primary={flag} />
                <Checkbox
                  checked={redFlags.includes(flag)}
                  onChange={() => {
                    setRedFlags((prev) =>
                      prev.includes(flag)
                        ? prev.filter((f) => f !== flag)
                        : [...prev, flag]
                    );
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="success.main">
            Green Flags
          </Typography>
          <List>
            {[
              'Quantifiable achievements',
              'Clear career progression',
              'Evidence of leadership/initiative',
              'Relevant industry experience',
              'Additional valuable skills/certifications',
            ].map((flag) => (
              <ListItem key={flag}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={flag} />
                <Checkbox
                  checked={greenFlags.includes(flag)}
                  onChange={() => {
                    setGreenFlags((prev) =>
                      prev.includes(flag)
                        ? prev.filter((f) => f !== flag)
                        : [...prev, flag]
                    );
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </StyledPaper>
  );

  const renderPhase4 = () => (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Interview Preparation
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Key Questions to Ask
      </Typography>
      <List>
        {[
          'Describe a complex program you managed across multiple functions',
          'Tell me about a time when you had to establish structure in an ambiguous situation',
          'How do you reconcile competing priorities across teams?',
          'What tools and methodologies do you use to keep projects on track?',
          'How do you build relationships across diverse stakeholders?',
        ].map((question, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText primary={question} />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Notes for Hiring Manager
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Enter key strengths, potential concerns, and specific experiences to discuss..."
        value={interviewNotes}
        onChange={(e) => setInterviewNotes(e.target.value)}
      />
    </StyledPaper>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && renderPhase1()}
        {activeStep === 1 && renderPhase2()}
        {activeStep === 2 && renderPhase3()}
        {activeStep === 3 && renderPhase4()}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSave : handleNext}
          >
            {activeStep === steps.length - 1 ? 'Save Review' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StructuredResumeReview; 