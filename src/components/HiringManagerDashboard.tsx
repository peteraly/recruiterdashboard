import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface Candidate {
  id: string;
  name: string;
  role: string;
  status: 'new' | 'in_review' | 'shortlisted' | 'rejected';
  matchScore: number;
  appliedDate: string;
  skills: string[];
  avatar?: string;
}

interface HiringManagerDashboardProps {
  candidates: Candidate[];
  onViewCandidate: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

const HiringManagerDashboard: React.FC<HiringManagerDashboardProps> = ({
  candidates,
  onViewCandidate,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'primary';
      case 'in_review':
        return 'warning';
      case 'shortlisted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <StarIcon />;
      case 'in_review':
        return <ScheduleIcon />;
      case 'shortlisted':
        return <CheckCircleIcon />;
      case 'rejected':
        return <CancelIcon />;
      default:
        return <StarBorderIcon />;
    }
  };

  const filteredCandidates = candidates
    .filter((candidate) => {
      if (filterStatus !== 'all' && candidate.status !== filterStatus) return false;
      if (searchTerm && !candidate.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'match':
          return b.matchScore - a.matchScore;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      {/* Dashboard Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Candidate Review Dashboard
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip 
                  label={`${candidates.filter(c => c.status === 'new').length} New`}
                  color="primary"
                />
                <Chip 
                  label={`${candidates.filter(c => c.status === 'in_review').length} In Review`}
                  color="warning"
                />
                <Chip 
                  label={`${candidates.filter(c => c.status === 'shortlisted').length} Shortlisted`}
                  color="success"
                />
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Export Report
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Filter by Status"
              >
                <MenuItem value="all">All Candidates</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="in_review">In Review</MenuItem>
                <MenuItem value="shortlisted">Shortlisted</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort by"
              >
                <MenuItem value="date">Application Date</MenuItem>
                <MenuItem value="match">Match Score</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Candidates Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Match Score</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Applied</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={candidate.avatar} />
                    <Typography>{candidate.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{candidate.role}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>{candidate.matchScore}%</Typography>
                    {candidate.matchScore >= 80 && <StarIcon color="warning" />}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(candidate.status)}
                    label={candidate.status.replace('_', ' ')}
                    color={getStatusColor(candidate.status)}
                  />
                </TableCell>
                <TableCell>{new Date(candidate.appliedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <Chip key={skill} label={skill} size="small" />
                    ))}
                    {candidate.skills.length > 3 && (
                      <Chip label={`+${candidate.skills.length - 3}`} size="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onViewCandidate(candidate.id)}
                    >
                      View
                    </Button>
                    <FormControl size="small">
                      <Select
                        value={candidate.status}
                        onChange={(e) => onUpdateStatus(candidate.id, e.target.value)}
                        size="small"
                      >
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="in_review">In Review</MenuItem>
                        <MenuItem value="shortlisted">Shortlist</MenuItem>
                        <MenuItem value="rejected">Reject</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HiringManagerDashboard; 