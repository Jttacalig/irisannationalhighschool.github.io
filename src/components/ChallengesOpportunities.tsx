import React from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BuildIcon from '@mui/icons-material/Build';
import { useSchoolContent } from '../context/SchoolContentContext';
import PageLayout from './PageLayout';

const ChallengesOpportunities = () => {
  const { content } = useSchoolContent();
  const { challenges, opportunities } = content.challengesOpportunities;

  return (
    <PageLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Challenges & Opportunities
        </Typography>

        <Grid container spacing={4}>
          {/* Challenges Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Box display="flex" alignItems="center" mb={3}>
                <BuildIcon sx={{ fontSize: 40, color: '#006600', mr: 2 }} />
                <Typography variant="h5" component="h2">
                  Current Challenges
                </Typography>
              </Box>
              
              {challenges.map((challenge, index) => (
                <Paper 
                  key={index}
                  elevation={2}
                  sx={{ 
                    p: 2,
                    mb: 2,
                    backgroundColor: '#f8f8f8',
                    borderLeft: '4px solid #d32f2f',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateX(8px)',
                    }
                  }}
                >
                  <Typography variant="h6" component="h3" gutterBottom>
                    {challenge.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {challenge.description}
                  </Typography>
                </Paper>
              ))}
            </Paper>
          </Grid>

          {/* Opportunities Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Box display="flex" alignItems="center" mb={3}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#006600', mr: 2 }} />
                <Typography variant="h5" component="h2">
                  Growth Opportunities
                </Typography>
              </Box>
              
              {opportunities.map((opportunity, index) => (
                <Paper 
                  key={index}
                  elevation={2}
                  sx={{ 
                    p: 2,
                    mb: 2,
                    backgroundColor: '#f8f8f8',
                    borderLeft: '4px solid #2e7d32',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateX(8px)',
                    }
                  }}
                >
                  <Typography variant="h6" component="h3" gutterBottom>
                    {opportunity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {opportunity.description}
                  </Typography>
                </Paper>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default ChallengesOpportunities;
