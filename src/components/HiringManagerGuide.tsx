import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

interface MeetingNote {
  id: string;
  text: string;
  category: 'requirement' | 'question' | 'action';
  completed: boolean;
}

const HiringManagerGuide: React.FC = () => {
  const [meetingNotes, setMeetingNotes] = useState<MeetingNote[]>([
    {
      id: '1',
      text: 'Schedule 30-minute intake meeting',
      category: 'action',
      completed: false,
    },
    {
      id: '2',
      text: 'Clarify requirements and deal-breakers',
      category: 'requirement',
      completed: false,
    },
    {
      id: '3',
      text: 'Understand team dynamics',
      category: 'requirement',
      completed: false,
    },
  ]);

  const [newNote, setNewNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'requirement' | 'question' | 'action'>('requirement');

  const handleAddNote = () => {
    if (newNote.trim()) {
      setMeetingNotes([
        ...meetingNotes,
        {
          id: Date.now().toString(),
          text: newNote,
          category: selectedCategory,
          completed: false,
        },
      ]);
      setNewNote('');
    }
  };

  const handleToggleNote = (id: string) => {
    setMeetingNotes(
      meetingNotes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const handleDeleteNote = (id: string) => {
    setMeetingNotes(meetingNotes.filter((note) => note.id !== id));
  };

  const keyQuestions = [
    {
      category: 'Role Requirements',
      questions: [
        'What are the 3-5 most critical skills or experiences for success in this role?',
        'What level of expertise is required in each skill area?',
        'Are there any certifications or specific qualifications that are mandatory?',
      ],
    },
    {
      category: 'Performance Expectations',
      questions: [
        'What problems will this person be solving in their first 90 days?',
        'What metrics will be used to measure success in this role?',
        'What are the key deliverables expected in the first 6 months?',
      ],
    },
    {
      category: 'Team Dynamics',
      questions: [
        'What qualities from your top performers would you like to see in this candidate?',
        'How does this role interact with other teams or departments?',
        'What is the team culture and work style?',
      ],
    },
    {
      category: 'Growth Opportunities',
      questions: [
        'What is the career progression path for this role?',
        'What training or development opportunities are available?',
        'How does this role contribute to the company\'s long-term goals?',
      ],
    },
  ];

  const followUpActions = [
    {
      title: 'Document Requirements',
      description: 'Create a detailed job description based on the meeting notes',
      icon: <AssignmentIcon />,
    },
    {
      title: 'Update Review Criteria',
      description: 'Adjust the resume review criteria to align with hiring manager priorities',
      icon: <CheckCircleIcon />,
    },
    {
      title: 'Schedule Team Interviews',
      description: 'Coordinate with team members for candidate interviews',
      icon: <GroupIcon />,
    },
    {
      title: 'Set Timeline',
      description: 'Establish a hiring timeline and milestones',
      icon: <TimelineIcon />,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hiring Manager Meeting Guide
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Prepare for and conduct effective hiring manager meetings to ensure alignment on role requirements and expectations.
      </Typography>

      <Grid container spacing={3}>
        {/* Meeting Preparation */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Meeting Preparation
            </Typography>
            <List>
              {meetingNotes.map((note) => (
                <ListItem
                  key={note.id}
                  secondaryAction={
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      Delete
                    </Button>
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={note.completed}
                      onChange={() => handleToggleNote(note.id)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={note.text}
                    sx={{
                      textDecoration: note.completed ? 'line-through' : 'none',
                      color: note.completed ? 'text.secondary' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add new note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label="Requirement"
                color={selectedCategory === 'requirement' ? 'primary' : 'default'}
                onClick={() => setSelectedCategory('requirement')}
              />
              <Chip
                label="Question"
                color={selectedCategory === 'question' ? 'primary' : 'default'}
                onClick={() => setSelectedCategory('question')}
              />
              <Chip
                label="Action"
                color={selectedCategory === 'action' ? 'primary' : 'default'}
                onClick={() => setSelectedCategory('action')}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Key Questions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Key Questions to Ask
            </Typography>
            {keyQuestions.map((section, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{section.category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {section.questions.map((question, qIndex) => (
                      <ListItem key={qIndex}>
                        <ListItemIcon>
                          <QuestionAnswerIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={question} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        {/* Follow-up Actions */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Follow-up Actions
          </Typography>
          <Grid container spacing={2}>
            {followUpActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {action.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {action.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Start</Button>
                    <Button size="small">Schedule</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HiringManagerGuide; 