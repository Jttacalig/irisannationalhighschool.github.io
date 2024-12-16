import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useSchoolContent } from '../context/SchoolContentContext';
import PageLayout from './PageLayout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ManageSchoolContent = () => {
  const navigate = useNavigate();
  const { 
    content, 
    updateVisionMission, 
    updateHistory, 
    updateChallengesOpportunities, 
    updateCommunityEngagement,
    isAuthorized 
  } = useSchoolContent();

  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<string>('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [tempContent, setTempContent] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type: string, item?: any) => {
    setDialogType(type);
    setEditingItem(item);
    setTempContent(item ? { ...item } : {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setEditingItem(null);
    setTempContent(null);
  };

  // Challenge & Opportunity handlers
  const handleAddChallenge = () => {
    if (tempContent?.title && tempContent?.description) {
      const newChallenges = [...content.challengesOpportunities.challenges, tempContent];
      updateChallengesOpportunities({
        ...content.challengesOpportunities,
        challenges: newChallenges
      });
      handleCloseDialog();
    }
  };

  const handleAddOpportunity = () => {
    if (tempContent?.title && tempContent?.description) {
      const newOpportunities = [...content.challengesOpportunities.opportunities, tempContent];
      updateChallengesOpportunities({
        ...content.challengesOpportunities,
        opportunities: newOpportunities
      });
      handleCloseDialog();
    }
  };

  const handleDeleteChallenge = (index: number) => {
    const newChallenges = content.challengesOpportunities.challenges.filter((_, i) => i !== index);
    updateChallengesOpportunities({
      ...content.challengesOpportunities,
      challenges: newChallenges
    });
  };

  const handleDeleteOpportunity = (index: number) => {
    const newOpportunities = content.challengesOpportunities.opportunities.filter((_, i) => i !== index);
    updateChallengesOpportunities({
      ...content.challengesOpportunities,
      opportunities: newOpportunities
    });
  };

  // Community Engagement handlers
  const handleAddProgram = () => {
    if (tempContent?.title && tempContent?.description) {
      const newPrograms = [...content.communityEngagement.programs, tempContent];
      updateCommunityEngagement({
        ...content.communityEngagement,
        programs: newPrograms
      });
      handleCloseDialog();
    }
  };

  const handleDeleteProgram = (index: number) => {
    const newPrograms = content.communityEngagement.programs.filter((_, i) => i !== index);
    updateCommunityEngagement({
      ...content.communityEngagement,
      programs: newPrograms
    });
  };

  const handleUpdateCommunityIntro = () => {
    updateCommunityEngagement({
      ...content.communityEngagement,
      introduction: tempContent.introduction
    });
    handleCloseDialog();
  };

  if (!isAuthorized) {
    return (
      <PageLayout>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Access Denied
          </Typography>
          <Typography>
            Please log in as an administrator to manage school content.
          </Typography>
        </Paper>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          mb: 3 
        }}>
          <IconButton 
            onClick={() => navigate('/admin')}
            sx={{ 
              color: '#006600',
              '&:hover': {
                backgroundColor: 'rgba(0, 102, 0, 0.1)',
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">
            Manage School Content
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Vision & Mission" />
            <Tab label="History" />
            <Tab label="Challenges & Opportunities" />
            <Tab label="Community Engagement" />
          </Tabs>
        </Box>

        {/* Vision & Mission Panel */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Vision</Typography>
              <Button 
                startIcon={<EditIcon />}
                onClick={() => handleOpenDialog('vision', { vision: content.visionMission.vision })}
                variant="contained"
                color="primary"
              >
                Edit Vision
              </Button>
            </Box>
            <Typography>{content.visionMission.vision}</Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Mission Points</Typography>
              <Button 
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('mission')}
                variant="contained"
                color="primary"
              >
                Add Mission Point
              </Button>
            </Box>
            <List>
              {content.visionMission.mission.map((point, index) => (
                <ListItem key={index}>
                  <ListItemText primary={point} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => {
                      const newMission = content.visionMission.mission.filter((_, i) => i !== index);
                      updateVisionMission({
                        ...content.visionMission,
                        mission: newMission
                      });
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </TabPanel>

        {/* History Panel */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Introduction</Typography>
              <Button 
                startIcon={<EditIcon />}
                onClick={() => handleOpenDialog('historyIntro', { introduction: content.history.introduction })}
                variant="contained"
                color="primary"
              >
                Edit Introduction
              </Button>
            </Box>
            <Typography>{content.history.introduction}</Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Milestones</Typography>
              <Button 
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('milestone')}
                variant="contained"
                color="primary"
              >
                Add Milestone
              </Button>
            </Box>
            <List>
              {content.history.milestones
                .sort((a, b) => Number(a.year) - Number(b.year))
                .map((milestone, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${milestone.year} - ${milestone.title}`}
                      secondary={milestone.description}
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        onClick={() => {
                          const newMilestones = content.history.milestones.filter((_, i) => i !== index);
                          updateHistory({
                            ...content.history,
                            milestones: newMilestones
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
              ))}
            </List>
          </Box>
        </TabPanel>

        {/* Challenges & Opportunities Panel */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Challenges</Typography>
              <Button 
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('challenge')}
                variant="contained"
                color="primary"
              >
                Add Challenge
              </Button>
            </Box>
            <List>
              {content.challengesOpportunities.challenges.map((challenge, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={challenge.title}
                    secondary={challenge.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDeleteChallenge(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Opportunities</Typography>
              <Button 
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('opportunity')}
                variant="contained"
                color="primary"
              >
                Add Opportunity
              </Button>
            </Box>
            <List>
              {content.challengesOpportunities.opportunities.map((opportunity, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={opportunity.title}
                    secondary={opportunity.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDeleteOpportunity(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </TabPanel>

        {/* Community Engagement Panel */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Introduction</Typography>
              <Button 
                startIcon={<EditIcon />}
                onClick={() => handleOpenDialog('communityIntro', { introduction: content.communityEngagement.introduction })}
                variant="contained"
                color="primary"
              >
                Edit Introduction
              </Button>
            </Box>
            <Typography>{content.communityEngagement.introduction}</Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Programs</Typography>
              <Button 
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('program')}
                variant="contained"
                color="primary"
              >
                Add Program
              </Button>
            </Box>
            <List>
              {content.communityEngagement.programs.map((program, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={program.title}
                    secondary={program.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDeleteProgram(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </TabPanel>

        {/* Dialog for adding/editing content */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {dialogType === 'challenge' ? 'Add Challenge' :
             dialogType === 'opportunity' ? 'Add Opportunity' :
             dialogType === 'program' ? 'Add Program' :
             dialogType === 'communityIntro' ? 'Edit Community Introduction' :
             'Edit Content'}
          </DialogTitle>
          <DialogContent>
            {dialogType === 'vision' && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Vision Statement"
                value={tempContent?.vision || ''}
                onChange={(e) => setTempContent({ ...tempContent, vision: e.target.value })}
                margin="normal"
              />
            )}
            {dialogType === 'mission' && (
              <TextField
                fullWidth
                label="Mission Point"
                value={tempContent?.point || ''}
                onChange={(e) => setTempContent({ ...tempContent, point: e.target.value })}
                margin="normal"
              />
            )}
            {dialogType === 'historyIntro' && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="History Introduction"
                value={tempContent?.introduction || ''}
                onChange={(e) => setTempContent({ ...tempContent, introduction: e.target.value })}
                margin="normal"
              />
            )}
            {dialogType === 'milestone' && (
              <>
                <TextField
                  fullWidth
                  label="Year"
                  value={tempContent?.year || ''}
                  onChange={(e) => setTempContent({ ...tempContent, year: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Title"
                  value={tempContent?.title || ''}
                  onChange={(e) => setTempContent({ ...tempContent, title: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={tempContent?.description || ''}
                  onChange={(e) => setTempContent({ ...tempContent, description: e.target.value })}
                  margin="normal"
                />
              </>
            )}
            {['challenge', 'opportunity', 'program'].includes(dialogType) && (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  value={tempContent?.title || ''}
                  onChange={(e) => setTempContent({ ...tempContent, title: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={tempContent?.description || ''}
                  onChange={(e) => setTempContent({ ...tempContent, description: e.target.value })}
                  margin="normal"
                />
              </>
            )}
            {dialogType === 'communityIntro' && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Introduction"
                value={tempContent?.introduction || ''}
                onChange={(e) => setTempContent({ ...tempContent, introduction: e.target.value })}
                margin="normal"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={() => {
                switch (dialogType) {
                  case 'vision':
                    updateVisionMission({
                      ...content.visionMission,
                      vision: tempContent.vision
                    });
                    handleCloseDialog();
                    break;
                  case 'mission':
                    if (tempContent?.point) {
                      updateVisionMission({
                        ...content.visionMission,
                        mission: [...content.visionMission.mission, tempContent.point]
                      });
                      handleCloseDialog();
                    }
                    break;
                  case 'historyIntro':
                    updateHistory({
                      ...content.history,
                      introduction: tempContent.introduction
                    });
                    handleCloseDialog();
                    break;
                  case 'milestone':
                    if (tempContent?.year && tempContent?.title && tempContent?.description) {
                      updateHistory({
                        ...content.history,
                        milestones: [...content.history.milestones, tempContent]
                      });
                      handleCloseDialog();
                    }
                    break;
                  case 'challenge':
                    handleAddChallenge();
                    break;
                  case 'opportunity':
                    handleAddOpportunity();
                    break;
                  case 'program':
                    handleAddProgram();
                    break;
                  case 'communityIntro':
                    handleUpdateCommunityIntro();
                    break;
                }
              }}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </PageLayout>
  );
};

export default ManageSchoolContent;
