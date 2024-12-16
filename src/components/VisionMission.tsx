import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { useSchoolContent } from '../context/SchoolContentContext';
import PageLayout from './PageLayout';

const VisionMission = () => {
  const { content } = useSchoolContent();
  const { vision, mission } = content.visionMission;

  return (
    <PageLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Vision & Mission
        </Typography>
        
        {/* Vision Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <VisibilityIcon sx={{ fontSize: 40, color: '#006600', mr: 2 }} />
            <Typography variant="h5" component="h2">
              Our Vision
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {vision}
          </Typography>
        </Paper>

        {/* Mission Section */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <TrackChangesIcon sx={{ fontSize: 40, color: '#006600', mr: 2 }} />
            <Typography variant="h5" component="h2">
              Our Mission
            </Typography>
          </Box>
          <Box component="ul" sx={{ pl: 4 }}>
            {mission.map((item, index) => (
              <Typography key={index} component="li" variant="body1" paragraph>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Container>
    </PageLayout>
  );
};

export default VisionMission;
