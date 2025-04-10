import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Rating,
  Chip,
  Stack,
} from '@mui/material';
import { Candidate, ReviewPhase1Data, ReviewPhase2Data, ReviewCriteria } from '../types';

interface CandidateReviewProps {
  candidate: Candidate;
  onSave: (candidate: Candidate) => void;
}

const CandidateReview: React.FC<CandidateReviewProps> = ({ candidate, onSave }) => {
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
  const [notes, setNotes] = useState(candidate.notes);

  const steps = ['Quick Assessment', 'Detailed Evaluation', 'Final Classification'];

  const handlePhase1Change = (field: keyof ReviewPhase1Data) => {
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

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    const phase1Score = Object.values(phase1Data).filter(Boolean).length * 25;
    const phase2Score = calculateTotalScore();
    
    onSave({
      ...candidate,
      phase1Score,
      phase2Score,
      notes,
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

  const renderPhase1 = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
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
    </Box>
  );

  const renderPhase2 = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Detailed Evaluation
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(phase2Data).map(([category, criteria]) => (
          <Grid item xs={12} key={category}>
            <Typography variant="subtitle1" gutterBottom>
              {category.charAt(0).toUpperCase() + category.slice(1)}
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
                          handlePhase2Change(
                            category as keyof ReviewPhase2Data,
                            field,
                            value || 0,
                            'rating'
                          )
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
                        handlePhase2Change(
                          category as keyof ReviewPhase2Data,
                          field,
                          e.target.value,
                          'notes'
                        )
                      }
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderPhase3 = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Final Classification
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Overall Score: {calculateTotalScore()}%
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Final Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Candidate Review
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Phase 1 Score
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Quick Assessment Score:
          </Typography>
          <Rating
            value={Math.round(Object.values(phase1Data).filter(Boolean).length * 25 / 20)}
            readOnly
          />
          <Typography variant="body2" sx={{ ml: 2 }}>
            {Object.values(phase1Data).filter(Boolean).length * 25}%
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Phase 2 Score
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Detailed Evaluation Score:
          </Typography>
          <Rating
            value={Math.round(calculateTotalScore() / 20)}
            readOnly
          />
          <Typography variant="body2" sx={{ ml: 2 }}>
            {calculateTotalScore()}%
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notes
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about the candidate..."
        />
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleSave}>
          Save Review
        </Button>
      </Box>
    </Box>
  );
};

export default CandidateReview; 