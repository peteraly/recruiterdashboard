import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Rating,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import {
  ReviewPhase1Data,
  ReviewPhase2Data,
  ReviewCriteria,
} from '../types';

interface ResumeAnalysisWorkflowProps {
  onSave: (phase1Data: ReviewPhase1Data, phase2Data: ReviewPhase2Data) => void;
}

const ResumeAnalysisWorkflow: React.FC<ResumeAnalysisWorkflowProps> = ({
  onSave,
}) => {
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

  const handleSave = () => {
    onSave(phase1Data, phase2Data);
  };

  const renderPhase1 = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Phase 1: Quick Assessment (60-90 seconds)
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
            label="Education: Required degree/certification"
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
            label="Technical Requirements: Essential skills present"
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
    </Paper>
  );

  const renderPhase2 = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Phase 2: Detailed Evaluation (5-7 minutes)
      </Typography>
      {Object.entries(phase2Data).map(([category, criteria]) => (
        <Box key={category} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {(Object.entries(criteria) as [string, ReviewCriteria][]).map(([field, data]) => (
              <Grid item xs={12} key={field}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ flex: 1 }}>
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Weight: {data.weight}
                  </Typography>
                  <Rating
                    value={data.rating}
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
                  value={data.notes}
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
            ))}
          </Grid>
        </Box>
      ))}
    </Paper>
  );

  const renderPhase3 = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Red Flags & Green Flags
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="error">
            Red Flags
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {redFlags.map((flag, index) => (
              <Chip key={index} label={flag} color="error" />
            ))}
          </Stack>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a red flag"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                const newFlag = input.value.trim();
                if (newFlag) {
                  setRedFlags((prev) => [...prev, newFlag]);
                  input.value = '';
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="success.main">
            Green Flags
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {greenFlags.map((flag, index) => (
              <Chip key={index} label={flag} color="success" />
            ))}
          </Stack>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a green flag"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                const newFlag = input.value.trim();
                if (newFlag) {
                  setGreenFlags((prev) => [...prev, newFlag]);
                  input.value = '';
                }
              }
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      {renderPhase1()}
      {renderPhase2()}
      {renderPhase3()}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="contained" onClick={handleSave}>
          Save Review
        </Button>
      </Box>
    </Box>
  );
};

export default ResumeAnalysisWorkflow; 