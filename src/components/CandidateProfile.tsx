import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  Paper,
  Tabs,
  Tab,
  Divider,
  Rating,
  LinearProgress,
  IconButton,
  Link,
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Language as WebsiteIcon,
  PlayCircle as PlayCircleIcon,
  Assessment as AssessmentIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

interface Skill {
  name: string;
  level: number; // 0-100
  endorsements: number;
}

interface Experience {
  company: string;
  title: string;
  duration: string;
  description: string[];
  skills: string[];
}

interface Project {
  name: string;
  description: string;
  link?: string;
  technologies: string[];
}

interface Assessment {
  type: string;
  score: number;
  maxScore: number;
  date: string;
}

interface CandidateProfileData {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: {
    school: string;
    degree: string;
    field: string;
    graduationYear: number;
  }[];
  projects: Project[];
  assessments: Assessment[];
  links: {
    linkedin?: string;
    github?: string;
    website?: string;
    portfolio?: string;
  };
  videoIntro?: string;
}

interface CandidateProfileProps {
  candidate: CandidateProfileData;
  onContact: () => void;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ candidate, onContact }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      {/* Profile Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={candidate.avatar}
                sx={{ width: 120, height: 120 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {candidate.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {candidate.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={candidate.location} />
                {candidate.links.linkedin && (
                  <IconButton component={Link} href={candidate.links.linkedin} target="_blank">
                    <LinkedInIcon />
                  </IconButton>
                )}
                {candidate.links.github && (
                  <IconButton component={Link} href={candidate.links.github} target="_blank">
                    <GitHubIcon />
                  </IconButton>
                )}
                {candidate.links.website && (
                  <IconButton component={Link} href={candidate.links.website} target="_blank">
                    <WebsiteIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={onContact}>
                Contact Candidate
              </Button>
              {candidate.videoIntro && (
                <Button
                  variant="outlined"
                  startIcon={<PlayCircleIcon />}
                  sx={{ mt: 1 }}
                  fullWidth
                >
                  Watch Intro
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Paper sx={{ mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Overview" />
          <Tab label="Experience" />
          <Tab label="Skills & Projects" />
          <Tab label="Assessments" />
        </Tabs>
        <Divider />

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Professional Summary
              </Typography>
              <Typography paragraph>
                {candidate.summary}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Key Skills
              </Typography>
              <Grid container spacing={2}>
                {candidate.skills.slice(0, 6).map((skill) => (
                  <Grid item xs={12} sm={6} md={4} key={skill.name}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {skill.name}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={skill.level} 
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {skill.endorsements} endorsements
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Work Experience
              </Typography>
              <Grid container spacing={3}>
                {candidate.experience.map((exp, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                          <Typography variant="h6">{exp.title}</Typography>
                          <Typography color="text.secondary">{exp.company}</Typography>
                        </Box>
                        <Typography color="text.secondary">{exp.duration}</Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        {exp.description.map((desc, i) => (
                          <Typography key={i} paragraph>
                            • {desc}
                          </Typography>
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {exp.skills.map((skill) => (
                          <Chip key={skill} label={skill} size="small" />
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Technical Skills
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {candidate.skills.map((skill) => (
                  <Grid item xs={12} sm={6} md={4} key={skill.name}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {skill.name}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={skill.level} 
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {skill.endorsements} endorsements
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Projects
              </Typography>
              <Grid container spacing={3}>
                {candidate.projects.map((project) => (
                  <Grid item xs={12} sm={6} key={project.name}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        {project.name}
                      </Typography>
                      <Typography paragraph>
                        {project.description}
                      </Typography>
                      {project.link && (
                        <Button
                          variant="outlined"
                          size="small"
                          href={project.link}
                          target="_blank"
                          sx={{ mb: 2 }}
                        >
                          View Project
                        </Button>
                      )}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {project.technologies.map((tech) => (
                          <Chip key={tech} label={tech} size="small" />
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Skills Assessment
              </Typography>
              <Grid container spacing={3}>
                {candidate.assessments.map((assessment) => (
                  <Grid item xs={12} sm={6} key={assessment.type}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {assessment.type}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(assessment.score / assessment.maxScore) * 100}
                          sx={{ flexGrow: 1 }}
                        />
                        <Typography variant="body2">
                          {assessment.score}/{assessment.maxScore}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Completed {assessment.date}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CandidateProfile; 