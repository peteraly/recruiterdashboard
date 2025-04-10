import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

export const AdvancedResumeGuide: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [skillNote, setSkillNote] = useState<string>('');
  const [skillNotes, setSkillNotes] = useState<Record<string, string>>({});

  const handleAddSkillNote = () => {
    if (selectedSkill && skillNote) {
      setSkillNotes(prev => ({
        ...prev,
        [selectedSkill]: skillNote
      }));
      setSkillNote('');
      setSelectedSkill('');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Advanced Resume Review Tools
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimelineIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Career Progression Analysis</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Progression Indicators
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Upward Mobility"
                        secondary="Look for promotions, increased responsibilities, and scope expansion"
                      />
                      <Rating name="mobility" max={3} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AssessmentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Impact Growth"
                        secondary="Evaluate increasing impact of achievements over time"
                      />
                      <Rating name="impact" max={3} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Red Flag Patterns
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Role Regression"
                        secondary="Moving from higher to lower responsibility roles"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Frequent Job Changes"
                        secondary="Multiple positions with <1 year tenure"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PsychologyIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Behavioral Indicators</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Indicator</TableCell>
                  <TableCell>Positive Signs</TableCell>
                  <TableCell>Concerning Signs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Leadership Style</TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <Chip label="Mentoring others" color="success" />
                      </ListItem>
                      <ListItem>
                        <Chip label="Initiative in projects" color="success" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <Chip label="Isolated work only" color="error" />
                      </ListItem>
                      <ListItem>
                        <Chip label="No team achievements" color="error" />
                      </ListItem>
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Problem Solving</TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <Chip label="Complex solutions implemented" color="success" />
                      </ListItem>
                      <ListItem>
                        <Chip label="Measurable improvements" color="success" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <Chip label="Vague problem descriptions" color="error" />
                      </ListItem>
                      <ListItem>
                        <Chip label="No metrics provided" color="error" />
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AssessmentIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Skill Evolution Tracker</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Track skill development across roles
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Select Skill"
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select a skill</option>
                      <option value="technical">Technical Skills</option>
                      <option value="leadership">Leadership</option>
                      <option value="communication">Communication</option>
                      <option value="problem-solving">Problem Solving</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Add Note"
                      value={skillNote}
                      onChange={(e) => setSkillNote(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleAddSkillNote}
                      disabled={!selectedSkill || !skillNote}
                    >
                      Add Note
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {Object.entries(skillNotes).map(([skill, note]) => (
                <Paper key={skill} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" color="primary">
                    {skill}
                  </Typography>
                  <Typography variant="body2">
                    {note}
                  </Typography>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Interview Question Generator</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Experience Validation
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Career Transitions"
                        secondary="What motivated your transition from [Previous Role] to [Current Role]?"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Technical Depth"
                        secondary="Can you describe a technically challenging project and your specific contribution?"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Leadership Experience"
                        secondary="How have you influenced project outcomes without direct authority?"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Skill Assessment
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Problem Solving"
                        secondary="Describe a situation where you had to solve a complex problem with incomplete information."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Adaptability"
                        secondary="Tell me about a time when you had to quickly learn a new technology or process."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Collaboration"
                        secondary="How do you handle disagreements with team members about technical approaches?"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AdvancedResumeGuide; 