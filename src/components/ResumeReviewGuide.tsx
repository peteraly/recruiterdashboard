import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

export const ResumeReviewGuide: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resume Review Implementation Guide
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Step 1: Preparation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom>
            Meet with the Hiring Manager
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Schedule a 30-minute intake meeting"
                secondary="Clarify requirements, identify deal-breakers, understand team dynamics"
              />
            </ListItem>
          </List>

          <Typography variant="subtitle1" gutterBottom>
            Key Questions to Ask Hiring Managers
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Step 2: Initial Review Process (60-90 seconds per resume)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Quick-Scan Technique
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="First 20 seconds"
                    secondary="Scan education and total years of experience"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Next 30 seconds"
                    secondary="Review most recent 1-2 positions for relevance"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Final 30 seconds"
                    secondary="Look for key skills, accomplishments, and red flags"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Decision Points
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Clear Yes"
                    secondary="Meets all must-haves, shows relevant experience"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon color="info" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Maybe"
                    secondary="Meets most requirements but has questions/gaps"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Clear No"
                    secondary="Missing multiple must-haves or shows red flags"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Step 3: Detailed Evaluation (5-7 minutes per resume)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>What to Look For</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Experience</TableCell>
                  <TableCell>30%</TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="Relevant role experience" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Industry knowledge" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Project complexity" />
                      </ListItem>
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Skills</TableCell>
                  <TableCell>25%</TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="Technical proficiency" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Leadership abilities" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Communication skills" />
                      </ListItem>
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Achievements</TableCell>
                  <TableCell>25%</TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="Quantifiable results" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Impact on business" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Innovation/initiatives" />
                      </ListItem>
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Culture Fit</TableCell>
                  <TableCell>20%</TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="Values alignment" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Work style" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Growth mindset" />
                      </ListItem>
                    </List>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Best Practices</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Before You Start
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Review the job description thoroughly" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Have a quick call with the hiring manager" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Identify 3-5 non-negotiable requirements" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                For Efficiency
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Set a time limit per resume (8-10 minutes maximum)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Create separate Yes, Maybe, and No piles" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Use color-coding or highlighting for quick reference" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ResumeReviewGuide; 