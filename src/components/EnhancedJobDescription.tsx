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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  PlayCircle as PlayCircleIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  Group as TeamIcon,
  Timeline as GrowthIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Favorite as FavoriteIcon,
  CardGiftcard as CardGiftcardIcon,
  AccessTime as AccessTimeIcon,
  FlightTakeoff as FlightTakeoffIcon,
  Person as PersonIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

interface JobRequirement {
  id: string;
  text: string;
  type: 'must-have' | 'nice-to-have' | 'education';
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
    includesBonus?: boolean;
    includesEquity?: boolean;
  };
  summary: string;
  impact: string[];
  requirements: JobRequirement[];
  responsibilities: string[];
  teamSize: number;
  videoUrl?: string;
  jobId: string;
  postedDate: string;
  teamDescription: string;
  culture: {
    teamDescription: string;
    values: string[];
  };
  benefits: string[];
  additionalInfo: {
    workHours: string;
    travelRequirements: string;
    physicalRequirements: string;
    eeoStatement: string;
  };
}

interface EnhancedJobDescriptionProps {
  jobDescription: JobDescription;
  onApply: () => void;
}

const EnhancedJobDescription: React.FC<EnhancedJobDescriptionProps> = ({ jobDescription, onApply }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {jobDescription.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {jobDescription.department}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              <Chip icon={<LocationIcon />} label={jobDescription.location} />
              <Chip icon={<SalaryIcon />} 
                label={`${jobDescription.salary.currency}${jobDescription.salary.min.toLocaleString()} - ${jobDescription.salary.max.toLocaleString()}`} 
              />
              <Chip icon={<TeamIcon />} label={`Team of ${jobDescription.teamSize}`} />
              <Chip icon={<LocationIcon />} label={`Job ID: ${jobDescription.jobId}`} />
              <Chip icon={<LocationIcon />} label={`Posted: ${new Date(jobDescription.postedDate).toLocaleDateString()}`} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Salary Range
                </Typography>
                <Typography variant="h5" color="primary">
                  ${jobDescription.salary.min.toLocaleString()} - ${jobDescription.salary.max.toLocaleString()} {jobDescription.salary.currency}
                </Typography>
                {jobDescription.salary.includesBonus && (
                  <Typography variant="body2" color="text.secondary">
                    + Bonus
                  </Typography>
                )}
                {jobDescription.salary.includesEquity && (
                  <Typography variant="body2" color="text.secondary">
                    + Equity
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Overview Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Overview
            </Typography>
            <Typography paragraph>
              {jobDescription.summary}
            </Typography>
            <Typography paragraph>
              {jobDescription.teamDescription}
            </Typography>
          </Paper>

          {/* Impact Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Impact
            </Typography>
            <List>
              {jobDescription.impact.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Responsibilities Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Responsibilities
            </Typography>
            <List>
              {jobDescription.responsibilities.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Qualifications Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Qualifications
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Basic Qualifications
            </Typography>
            <List>
              {jobDescription.requirements
                .filter(req => req.type === 'must-have')
                .map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={req.text} />
                  </ListItem>
                ))}
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Preferred Skills
            </Typography>
            <List>
              {jobDescription.requirements
                .filter(req => req.type === 'nice-to-have')
                .map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <GrowthIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={req.text} />
                  </ListItem>
                ))}
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Education
            </Typography>
            <List>
              {/* Assuming jobDescription.qualifications.education is an array of strings */}
              {jobDescription.requirements
                .filter(req => req.type === 'education')
                .map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={req.text} />
                  </ListItem>
                ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Culture Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Our Culture
            </Typography>
            <Typography paragraph>
              {jobDescription.culture.teamDescription}
            </Typography>
            <List>
              {jobDescription.culture.values.map((value, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <FavoriteIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Benefits Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Benefits
            </Typography>
            <List>
              {jobDescription.benefits.map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CardGiftcardIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Additional Information */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Additional Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Work Hours"
                  secondary={jobDescription.additionalInfo.workHours}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FlightTakeoffIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Travel Requirements"
                  secondary={jobDescription.additionalInfo.travelRequirements}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Physical Requirements"
                  secondary={jobDescription.additionalInfo.physicalRequirements}
                />
              </ListItem>
            </List>
          </Paper>

          {/* EEO Statement */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {jobDescription.additionalInfo.eeoStatement}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Apply Footer */}
      <Card sx={{ position: 'sticky', bottom: 16, zIndex: 10 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">{jobDescription.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {jobDescription.department} • {jobDescription.location}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onApply}
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EnhancedJobDescription; 