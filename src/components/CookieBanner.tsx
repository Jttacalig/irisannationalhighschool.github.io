import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper,
  Slide
} from '@mui/material';
import { Link } from 'react-router-dom';
import CookieIcon from '@mui/icons-material/Cookie';

const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookiesAccepted');
    if (!hasAccepted) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            maxWidth: 'lg',
            mx: 'auto'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CookieIcon color="primary" sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                We use cookies to enhance your experience.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By continuing to use this website, you agree to our{' '}
                <Link to="/privacy-policy" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                  Privacy Policy
                </Link>
                .
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Button
              variant="contained"
              onClick={handleAccept}
              sx={{
                minWidth: { xs: '100%', sm: 120 },
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Accept
            </Button>
          </Box>
        </Box>
      </Paper>
    </Slide>
  );
};

export default CookieBanner;
