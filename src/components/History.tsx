import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useSchoolContent } from '../context/SchoolContentContext';
import PageLayout from './PageLayout';

const History = () => {
  const { content } = useSchoolContent();
  const { introduction, milestones } = content.history;

  return (
    <PageLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Our History
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Box display="flex" alignItems="center" mb={4}>
            <SchoolIcon sx={{ fontSize: 40, color: '#006600', mr: 2 }} />
            <Typography variant="h5" component="h2">
              The Journey of Irisan National High School
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            {introduction}
          </Typography>

          <Box sx={{ mt: 6 }}>
            {milestones.sort((a, b) => Number(a.year) - Number(b.year)).map((milestone) => (
              <Paper 
                key={milestone.year}
                elevation={2} 
                sx={{ 
                  p: 3, 
                  mb: 3,
                  backgroundColor: '#f8f8f8',
                  borderLeft: '4px solid #006600',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateX(8px)',
                  }
                }}
              >
                <Typography variant="h6" component="h3" color="primary" gutterBottom>
                  {milestone.year}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {milestone.title}
                </Typography>
                <Typography variant="body2">
                  {milestone.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Container>
    </PageLayout>
  );
};

export default History;
