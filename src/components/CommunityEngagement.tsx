import React from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useSchoolContent } from '../context/SchoolContentContext';
import PageLayout from './PageLayout';

const CommunityEngagement = () => {
  const { content } = useSchoolContent();
  const { introduction, programs } = content.communityEngagement;

  return (
    <PageLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Community Engagement
        </Typography>

        {/* Introduction Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <PeopleIcon sx={{ fontSize: 40, color: '#006600', mr: 2 }} />
            <Typography variant="h5" component="h2">
              Our Commitment to Community
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {introduction}
          </Typography>
        </Paper>

        {/* Programs Section */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={4}>
            <HandshakeIcon sx={{ fontSize: 40, color: '#006600', mr: 2 }} />
            <Typography variant="h5" component="h2">
              Community Programs
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {programs.map((program, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3,
                    height: '100%',
                    backgroundColor: '#f8f8f8',
                    borderLeft: '4px solid #006600',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[8],
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{ color: '#006600' }}
                  >
                    {program.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {program.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </PageLayout>
  );
};

export default CommunityEngagement;
