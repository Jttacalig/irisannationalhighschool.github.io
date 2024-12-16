import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Security,
  Info,
  Warning,
  Schedule,
  LockClock,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import PageLayout from './PageLayout';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAttempts, lastLogin, resetLoginAttempts } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  useEffect(() => {
    if (loginAttempts >= 5) {
      setIsLocked(true);
      setLockoutTime(300); // 5 minutes lockout
      const timer = setInterval(() => {
        setLockoutTime(prev => prev !== null ? prev - 1 : null);
      }, 1000);
      
      setTimeout(() => {
        setIsLocked(false);
        setLockoutTime(null);
        resetLoginAttempts();
        clearInterval(timer);
      }, 300000);

      return () => clearInterval(timer);
    }
  }, [loginAttempts, resetLoginAttempts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      setError('Account is temporarily locked. Please try again later.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const formatLockoutTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 600,
            mx: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Admin Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {isLocked && lockoutTime && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Account is locked. Please try again in {formatLockoutTime(lockoutTime)}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLocked || loading}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked || loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLocked || loading}
              sx={{ mt: 2, mb: 3 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Security Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Security color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Login Attempts" 
                  secondary={`${loginAttempts}/5 attempts (Account locks after 5 failed attempts)`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Schedule color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Last Login" 
                  secondary={lastLogin ? new Date(lastLogin).toLocaleString() : 'No previous login'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LockClock color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Lockout Duration" 
                  secondary="5 minutes after 5 failed attempts"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Info color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Session Information" 
                  secondary="Session expires after 24 hours of inactivity"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Warning color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Security Notice" 
                  secondary="This is a secure area. Unauthorized access attempts are logged and monitored."
                />
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Box>
    </PageLayout>
  );
};

export default AdminLogin;
