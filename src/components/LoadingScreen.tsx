import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'background.paper',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src={require('../assets/inhslogo.png')}
        alt="INHS"
        sx={{
          width: 120,
          height: 120,
          mb: 3,
          animation: 'pulse 2s infinite'
        }}
      />
      <CircularProgress
        size={48}
        thickness={4}
        sx={{
          mb: 2,
          color: 'primary.main'
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: 'text.primary',
          fontWeight: 500
        }}
      >
        Loading...
      </Typography>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingScreen;
