import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Avatar,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Divider,
  Rating,
  Tooltip,
} from '@mui/material';
import {
  PlayCircle as PlayCircleIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  Group as TeamIcon,
  Timeline as GrowthIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface JobRequirement {
  id: string;
  text: string;
  type: 'must-have' | 'nice-to-have';
}

interface JobDescription {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  summary: string;
  impact: string[];
  requirements: JobRequirement[];
  responsibilities: string[];
  benefits: string[];
  teamSize: number;
  videoUrl?: string;
}

interface EnhancedJobDescriptionProps {
  job: JobDescription;
  onApply: () => void;
}

const EnhancedJobDescription: React.FC<EnhancedJobDescriptionProps> = ({ job, onApply }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      {/* Hero Section */}
      <Card sx={{ mb: 4, position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                {job.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip icon={<LocationIcon />} label={job.location} />
                <Chip icon={<SalaryIcon />} 
                  label={`${job.salary.currency}${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}`} 
                />
                <Chip icon={<TeamIcon />} label={`Team of ${job.teamSize}`} />
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                {job.summary}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                onClick={onApply}
                sx={{ mb: 2 }}
              >
                Apply Now
              </Button>
              {job.videoUrl && (
                <Button
                  variant="outlined"
                  startIcon={<PlayCircleIcon />}
                  fullWidth
                >
                  Watch Team Intro
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Overview" />
          <Tab label="Requirements" />
          <Tab label="Team & Culture" />
          <Tab label="Benefits" />
        </Tabs>
        <Divider />
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Your Impact
              </Typography>
              <Grid container spacing={2}>
                {job.impact.map((impact, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                      <Typography variant="body1">{impact}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Key Responsibilities
              </Typography>
              <Grid container spacing={2}>
                {job.responsibilities.map((resp, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                      <CheckIcon color="success" />
                      <Typography variant="body1">{resp}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Must-Have Requirements
              </Typography>
              <Grid container spacing={2}>
                {job.requirements
                  .filter(req => req.type === 'must-have')
                  .map(req => (
                    <Grid item xs={12} sm={6} key={req.id}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                        <CheckIcon color="success" />
                        <Typography variant="body1">{req.text}</Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Nice-to-Have Skills
              </Typography>
              <Grid container spacing={2}>
                {job.requirements
                  .filter(req => req.type === 'nice-to-have')
                  .map(req => (
                    <Grid item xs={12} sm={6} key={req.id}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                        <GrowthIcon color="primary" />
                        <Typography variant="body1">{req.text}</Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Our Team Culture
              </Typography>
              {/* Add team culture content */}
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Benefits & Perks
              </Typography>
              <Grid container spacing={2}>
                {job.benefits.map((benefit, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body1">{benefit}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Quick Apply Footer */}
      <Card sx={{ position: 'sticky', bottom: 16, zIndex: 10 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">{job.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {job.department} • {job.location}
            </Typography>
          </Box>
          <Button variant="contained" onClick={onApply}>
            Quick Apply
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EnhancedJobDescription; 