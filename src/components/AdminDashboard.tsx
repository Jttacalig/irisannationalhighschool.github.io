import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SchoolIcon from '@mui/icons-material/School';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import PageLayout from './PageLayout';
import WebsiteAnalytics from './WebsiteAnalytics';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isAdminAuthorized', 'false');
    // Dispatch custom event to notify auth change
    window.dispatchEvent(new Event('adminAuthChanged'));
    navigate('/');
  };

  const adminOptions = [
    {
      title: 'Manage Posts',
      description: 'Manage news, events, and important dates',
      icon: <EditIcon fontSize="large" />,
      path: '/manage-posts',
    },
    {
      title: 'Manage Academic Content',
      description: 'Update academic programs and admission information',
      icon: <SchoolIcon fontSize="large" />,
      path: '/manage-academic-content',
    },
    {
      title: 'Manage Organizational Chart',
      description: 'Update the school\'s organizational structure',
      icon: <AccountTreeIcon fontSize="large" />,
      path: '/manage-organizational-chart',
    },
    {
      title: 'Manage School Content',
      description: 'Update vision, mission, history, and other school information',
      icon: <MenuBookIcon fontSize="large" />,
      path: '/manage-school-content',
    },
    {
      title: 'Manage Feedback',
      description: 'View and manage feedback submissions',
      icon: <FeedbackIcon fontSize="large" />,
      path: '/manage-feedback',
    },
  ];

  return (
    <PageLayout>
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
        {/* Header with Logout */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}>
          <Typography variant="h4" sx={{ mb: 0 }}>
            Admin Dashboard
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: 'error.main',
                color: 'white',
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Analytics Section */}
        <WebsiteAnalytics />

        {/* Admin Options Grid */}
        <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
          Management Options
        </Typography>
        <Grid container spacing={3}>
          {adminOptions.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[8],
                    '& .icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
                onClick={() => navigate(option.path)}
              >
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}>
                  <Box 
                    className="icon"
                    sx={{ 
                      color: '#006600',
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      '.MuiSvgIcon-root': {
                        fontSize: '2.5rem',
                      },
                    }}
                  >
                    {option.icon}
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default AdminDashboard;
