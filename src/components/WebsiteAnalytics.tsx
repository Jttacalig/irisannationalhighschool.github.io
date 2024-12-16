import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';
import { useAnalytics } from '../context/AnalyticsContext';

const WebsiteAnalytics: React.FC = () => {
  const { analyticsData, refreshAnalytics } = useAnalytics();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          Website Analytics
        </Typography>
        <Tooltip title="Refresh Analytics">
          <IconButton onClick={refreshAnalytics} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <VisibilityIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Views</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {formatNumber(analyticsData.pageViews.total)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Avg. Time</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {formatTime(analyticsData.userEngagement.averageTimeOnSite)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DevicesIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Devices</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {formatNumber(
                  Object.values(analyticsData.demographics.devices).reduce((a, b) => a + b, 0)
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Interactions</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {formatNumber(
                  analyticsData.interactions.feedbackSubmissions +
                  analyticsData.interactions.enrollmentInquiries
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Analytics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Popular Pages</Typography>
              {Object.entries(analyticsData.pageViews.byPage).map(([page, views]) => (
                <Box key={page} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{page}</Typography>
                    <Typography variant="body2">{formatNumber(views)} views</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(views / analyticsData.pageViews.total) * 100} 
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Device Distribution</Typography>
              {Object.entries(analyticsData.demographics.devices).map(([device, count]) => (
                <Box key={device} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{device}</Typography>
                    <Typography variant="body2">{formatNumber(count)} users</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(count / Object.values(analyticsData.demographics.devices).reduce((a, b) => a + b, 0)) * 100} 
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WebsiteAnalytics;
