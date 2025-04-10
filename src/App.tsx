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
    min: 150000,
    max: 220000,
    currency: 'USD',
    includesBonus: true,
    includesEquity: true
  },
  summary: 'We are seeking an experienced Senior Software Engineer...',
  impact: [
    'Lead development of core features',
    'Mentor junior developers',
    'Drive technical decisions'
  ],
  requirements: [
    {
      id: '1',
      text: '5+ years of experience in software development',
      type: 'must-have'
    },
    {
      id: '2',
      text: 'Bachelor\'s degree in Computer Science or related field',
      type: 'education'
    },
    {
      id: '3',
      text: 'Experience with cloud platforms',
      type: 'nice-to-have'
    }
  ],
  responsibilities: [
    'Lead development of core features',
    'Mentor junior developers',
    'Drive technical decisions'
  ],
  teamSize: 10,
  videoUrl: 'https://example.com/video',
  jobId: 'SE-2024-001',
  postedDate: new Date().toISOString(),
  teamDescription: 'Join our innovative engineering team focused on building scalable solutions',
  status: 'Active',
  qualifications: {
    basic: ['5+ years experience', 'Strong JavaScript skills'],
    preferred: ['Cloud platform experience', 'Team leadership'],
    education: ['Bachelor\'s degree in Computer Science']
  },
  additionalInfo: {
    workHours: 'Monday to Friday, 9:00 AM to 5:00 PM PST',
    travelRequirements: 'Occasional travel to client sites (10-15%)',
    physicalRequirements: 'This position will be performed in an office setting. The position will require the incumbent to sit and stand at a desk, communicate in person and by telephone, frequently operate standard office equipment, such as telephones and computers.',
    eeoStatement: 'Visa is an EEO Employer. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, sexual orientation, gender identity, disability or protected veteran status.'
  },
  benefits: [
    'Medical, Dental, Vision',
    '401(k)',
    'FSA/HSA',
    'Life Insurance',
    'Paid Time Off',
    'Wellness Program'
  ],
  culture: {
    teamDescription: 'Our team values open communication and continuous learning',
    values: [
      'Innovation',
      'Collaboration',
      'Excellence'
    ]
  }
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
