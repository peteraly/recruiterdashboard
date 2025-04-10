import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Dashboard from './components/Dashboard';
import JobDescriptionManager from './components/JobDescriptionManager';
import CandidateReview from './components/CandidateReview';
import ResumeAnalysisSystem from './components/ResumeAnalysisSystem';
import ResumeReviewSystem from './components/ResumeReviewSystem';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Candidate, JobDescription } from './types';
import { AdvancedResumeGuide } from './components/AdvancedResumeGuide';
import JobAndCandidateManager from './components/JobAndCandidateManager';
import HiringManagerGuide from './components/HiringManagerGuide';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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
    'Lead the development of new features',
    'Mentor junior developers',
    'Improve code quality and performance'
  ],
  requirements: [
    {
      id: '1',
      text: '5+ years of experience in software development',
      type: 'must-have'
    },
    {
      id: '2',
      text: 'Strong knowledge of React and TypeScript',
      type: 'must-have'
    },
    {
      id: '3',
      text: 'Experience with cloud platforms (AWS/GCP)',
      type: 'nice-to-have'
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
  responsibilities: [
    'Design and implement new features',
    'Code review and mentoring',
    'Performance optimization'
  ],
  benefits: [
    'Competitive salary',
    'Health insurance',
    '401(k) matching',
    'Flexible work hours',
    'Remote work options'
  ],
  teamSize: 8,
  videoUrl: 'https://example.com/video',
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

function App() {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([mockJobDescription]);
  const [candidates, setCandidates] = useState<Candidate[]>([mockCandidate]);

  const handleJobDescriptionAdd = (jobDescription: JobDescription) => {
    setJobDescriptions(prev => [...prev, jobDescription]);
  };

  const handleJobDescriptionEdit = (jobDescription: JobDescription) => {
    setJobDescriptions(prev => 
      prev.map(job => job.id === jobDescription.id ? jobDescription : job)
    );
  };

  const handleJobDescriptionDelete = (id: string) => {
    setJobDescriptions(prev => prev.filter(job => job.id !== id));
  };

  const handleCandidateAdd = (candidate: Candidate) => {
    setCandidates(prev => [...prev, candidate]);
  };

  const handleCandidateEdit = (candidate: Candidate) => {
    setCandidates(prev => 
      prev.map(cand => cand.id === candidate.id ? candidate : cand)
    );
  };

  const handleCandidateDelete = (id: string) => {
    setCandidates(prev => prev.filter(cand => cand.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Resume Review Dashboard
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/manage">
                Manage
              </Button>
              <Button color="inherit" component={Link} to="/jobs">
                Job Descriptions
              </Button>
              <Button color="inherit" component={Link} to="/candidates">
                Candidates
              </Button>
              <Button color="inherit" component={Link} to="/analysis">
                Resume Analysis
              </Button>
              <Button color="inherit" component={Link} to="/review">
                Review System
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/advanced-guide"
                sx={{ ml: 2 }}
              >
                Advanced Guide
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/hiring-manager-guide"
                sx={{ ml: 2 }}
              >
                Hiring Manager Guide
              </Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  jobDescriptions={jobDescriptions}
                  candidates={candidates}
                />
              } />
              <Route path="/manage" element={
                <JobAndCandidateManager
                  jobDescriptions={jobDescriptions}
                  candidates={candidates}
                  onJobDescriptionAdd={handleJobDescriptionAdd}
                  onJobDescriptionEdit={handleJobDescriptionEdit}
                  onJobDescriptionDelete={handleJobDescriptionDelete}
                  onCandidateAdd={handleCandidateAdd}
                  onCandidateEdit={handleCandidateEdit}
                  onCandidateDelete={handleCandidateDelete}
                />
              } />
              <Route 
                path="/jobs" 
                element={
                  <JobDescriptionManager 
                    jobDescription={mockJobDescription}
                    onSave={handleJobDescriptionEdit}
                  />
                } 
              />
              <Route 
                path="/candidates" 
                element={
                  <CandidateReview 
                    candidate={mockCandidate}
                    onSave={handleCandidateEdit}
                  />
                } 
              />
              <Route path="/analysis" element={<ResumeAnalysisSystem />} />
              <Route 
                path="/review" 
                element={
                  <ResumeReviewSystem
                    candidate={mockCandidate}
                    jobDescription={mockJobDescription}
                    onComplete={handleCandidateEdit}
                  />
                } 
              />
              <Route path="/advanced-guide" element={<AdvancedResumeGuide />} />
              <Route path="/hiring-manager-guide" element={<HiringManagerGuide />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
