import React from 'react';
import { Container, Typography, Paper, Box, CircularProgress } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useOrganizationalChart, Position } from '../context/OrganizationalChartContext';
import { getFileUrl } from '../utils/fileStorage';
import PageLayout from './PageLayout';
import './OrganizationalChart.css';

const OrganizationalChart = () => {
  const { positions, loading } = useOrganizationalChart();

  // Group positions by level
  const organizedPositions = positions.reduce((acc, position) => {
    const level = position.level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(position);
    return acc;
  }, {} as Record<number, Position[]>);

  const getBoxStyle = (level: number) => {
    switch (level) {
      case 1: return 'principal';
      case 2: return 'head-teacher';
      case 3: return 'teacher';
      default: return 'staff';
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <PageLayout>
      <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            Organizational Chart
          </Typography>
          <Typography variant="body1" paragraph>
            Our school's organizational structure is designed to ensure effective leadership, 
            clear communication, and efficient management of all academic and administrative functions.
          </Typography>
        </Box>

        <Box className="org-chart">
          {Object.entries(organizedPositions)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([level, levelPositions]) => (
              <div key={level} className="org-level">
                {levelPositions.map((position) => (
                  <div 
                    key={position.id} 
                    className={`org-box ${getBoxStyle(Number(level))}`}
                  >
                    <div className="org-title">
                      {position.title}
                    </div>
                    <div className="org-name">
                      {position.name}
                    </div>
                    {position.imageKey && (
                      <Box 
                        component="img"
                        src={getFileUrl(position.imageKey) || ''} 
                        alt={`${position.name}'s profile`}
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          mt: 2,
                          mb: 2,
                          border: '3px solid rgba(255, 255, 255, 0.2)'
                        }}
                      />
                    )}
                    {position.description && (
                      <div className="org-description">
                        {position.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
        </Box>
      </Paper>
    </PageLayout>
  );
};

export default OrganizationalChart;
