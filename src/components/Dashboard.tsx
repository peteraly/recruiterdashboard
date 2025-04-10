import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  ListItemButton,
  Divider,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  PendingActions as PendingActionsIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { Candidate, JobDescription } from '../types';
import ResumeReviewGuide from './ResumeReviewGuide';

interface DashboardProps {
  jobDescriptions: JobDescription[];
  candidates: Candidate[];
}

const Dashboard: React.FC<DashboardProps> = ({ jobDescriptions, candidates }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Use actual data instead of mock data
  const recentCandidates = candidates.slice(0, 4).map(candidate => ({
    id: candidate.id,
    name: candidate.name,
    position: jobDescriptions.find(job => job.id === '1')?.title || 'Unknown Position',
    status: candidate.status,
    date: candidate.createdAt.toISOString().split('T')[0]
  }));

  const activeJobs = jobDescriptions.map(job => ({
    id: job.id,
    title: job.title,
    department: job.department,
    candidates: candidates.length
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'primary';
      case 'In Review':
        return 'warning';
      case 'Shortlisted':
        return 'success';
      default:
        return 'default';
    }
  };

  const newCandidates = candidates.filter(c => c.status === 'New');
  const inReviewCandidates = candidates.filter(c => c.status === 'In Review');
  const shortlistedCandidates = candidates.filter(c => c.status === 'Shortlisted');
  const activeJobsFiltered = jobDescriptions.filter(j => j.status === 'Active');

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Resume Review Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Job Descriptions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Candidates" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          backgroundColor: theme.palette.background.default,
          pt: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Summary Cards */}
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <PeopleIcon />
                    </Avatar>
                    <Typography variant="h6" color="text.secondary">
                      New Candidates
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                    {newCandidates.length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="success.main">
                      +{newCandidates.length - 4} from last week
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                      <PendingActionsIcon />
                    </Avatar>
                    <Typography variant="h6" color="text.secondary">
                      In Review
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                    {inReviewCandidates.length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      3 expected to complete today
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                      <CheckCircleIcon />
                    </Avatar>
                    <Typography variant="h6" color="text.secondary">
                      Shortlisted
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                    {shortlistedCandidates.length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      2 interviews scheduled
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                      <WorkIcon />
                    </Avatar>
                    <Typography variant="h6" color="text.secondary">
                      Active Jobs
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                    {activeJobsFiltered.length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      25 total applications
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Hiring Manager Guide Section */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Hiring Manager Meeting Guide
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Meeting Preparation
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText primary="Schedule 30-minute intake meeting" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Clarify requirements and deal-breakers" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Understand team dynamics" />
                          </ListItem>
                        </List>
                        <Button
                          variant="contained"
                          color="primary"
                          component={RouterLink}
                          to="/hiring-manager-guide"
                          startIcon={<AssignmentIcon />}
                        >
                          View Full Guide
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Key Questions
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText primary="What are the 3-5 most critical skills or experiences for success in this role?" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="What problems will this person be solving in their first 90 days?" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="What qualities from your top performers would you like to see in this candidate?" />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Recent Candidates */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Recent Candidates
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {recentCandidates.map((candidate) => (
                  <Box key={candidate.id} sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                    <Grid container alignItems="center">
                      <Grid item xs={8}>
                        <Typography variant="subtitle1">{candidate.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {candidate.position}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: 'right' }}>
                        <Chip 
                          label={candidate.status} 
                          size="small" 
                          color={getStatusColor(candidate.status) as any}
                        />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          {candidate.date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Paper>
            </Grid>

            {/* Active Job Descriptions */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Active Job Descriptions
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {activeJobsFiltered.map((job) => (
                  <Box key={job.id} sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                    <Grid container alignItems="center">
                      <Grid item xs={8}>
                        <Typography variant="subtitle1">{job.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.department}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.min(100, ((job.candidates?.length || 0) / 15) * 100)} 
                              sx={{ height: 8, borderRadius: 5 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {job.candidates?.length || 0}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Paper>
            </Grid>

            {/* Resume Review Guide */}
            <Grid item xs={12}>
              <ResumeReviewGuide />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 