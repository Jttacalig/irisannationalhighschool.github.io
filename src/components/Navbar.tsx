import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import inhslogo from '../assets/inhslogo.png';
import { useAuth } from '../context/AuthContext';

const pages = ['Home', 'School Info', 'Academic & Admission', 'News & Events', 'Contact', 'Admin'];

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuButtonRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubmenuClick = (page: string) => {
    setOpenSubmenu(openSubmenu === page ? null : page);
  };

  const getPageLink = (page: string) => {
    switch (page) {
      case 'Home':
        return '/';
      case 'School Info':
        return '/vision-mission';
      case 'Academic & Admission':
        return '/academic-programs';
      case 'News & Events':
        return '/news-events';
      case 'Contact':
        return '/contact';
      case 'Admin':
        return '/admin';
      default:
        return '/';
    }
  };

  const schoolInfoSubmenu = [
    { name: 'Vision & Mission', link: '/vision-mission' },
    { name: 'History', link: '/history' },
    { name: 'Organizational Chart', link: '/organizational-chart' },
    { name: 'Challenges & Opportunities', link: '/challenges-opportunities' },
    { name: 'Community Engagement', link: '/community-engagement' },
    { name: 'FAQs', link: '/faqs' },
  ];

  const academicSubmenu = [
    { name: 'Academic Programs', link: '/academic-programs' },
    { name: 'Admission', link: '/admission' },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <List>
        {pages.map((page) => (
          <React.Fragment key={page}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (page === 'School Info' || page === 'Academic & Admission') {
                    handleSubmenuClick(page);
                  } else if (page === 'Admin') {
                      if (isAuthenticated) {
                        logout();  // Clear authentication state
                        navigate('/admin-login');
                      } else {
                        navigate('/admin-login');
                      }
                    handleDrawerToggle();
                  } else {
                    navigate(getPageLink(page));
                    handleDrawerToggle();
                  }
                }}
                component={page === 'Admin' ? 'div' : Link}
                to={page !== 'Admin' ? getPageLink(page) : undefined}
                sx={{
                  color: 'inherit',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {page === 'Admin' && <AdminPanelSettingsIcon />}
                  <ListItemText primary={page} />
                  {(page === 'School Info' || page === 'Academic & Admission') && (openSubmenu === page ? <ExpandLess /> : <ExpandMore />)}
                </Box>
              </ListItemButton>
            </ListItem>
            {(page === 'School Info' || page === 'Academic & Admission') && (
              <Collapse in={openSubmenu === page} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {(page === 'School Info' ? schoolInfoSubmenu : academicSubmenu).map((item) => (
                    <ListItemButton
                      key={item.name}
                      component={Link}
                      to={item.link}
                      onClick={() => {
                        navigate(item.link);
                        handleDrawerToggle();
                      }}
                      sx={{
                        pl: 4,
                        justifyContent: 'center',
                      }}
                    >
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo and School Name - Always visible */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                component="img"
                src={inhslogo}
                alt="INHS Logo"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  height: '50px',
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#006600',
                  textDecoration: 'none',
                }}
              >
                IRISAN NATIONAL HIGH SCHOOL
              </Typography>
            </Box>

            {/* Mobile menu icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                sx={{ color: '#006600' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile logo and school name */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                component="img"
                src={inhslogo}
                alt="INHS Logo"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  height: '40px',
                  mr: 1,
                }}
              />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#006600',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                }}
              >
                INHS
              </Typography>
            </Box>

            {/* Desktop menu items */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
              }}
            >
              {pages.map((page) => (
                <React.Fragment key={page}>
                  {(page === 'School Info' || page === 'Academic & Admission') ? (
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-block',
                      }}
                      onMouseEnter={() => setOpenSubmenu(page)}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      <Button
                        ref={(el) => {
                          if (el) {
                            menuButtonRefs.current[page] = el;
                          }
                        }}
                        sx={{
                          my: 2,
                          color: '#006600',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {page}
                        {openSubmenu === page ? <ExpandLess /> : <ExpandMore />}
                      </Button>
                      <Menu
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        open={openSubmenu === page}
                        onClose={() => {}}
                        anchorEl={menuButtonRefs.current[page]}
                        MenuListProps={{
                          onMouseLeave: () => setOpenSubmenu(null)
                        }}
                        sx={{
                          display: { xs: 'none', md: 'block' },
                          '& .MuiPaper-root': {
                            backgroundColor: 'white',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                            marginTop: '0.5rem',
                          },
                        }}
                      >
                        {(page === 'School Info' ? schoolInfoSubmenu : academicSubmenu).map((item) => (
                          <MenuItem
                            key={item.name}
                            component={Link}
                            to={item.link}
                            onClick={() => setOpenSubmenu(null)}
                            sx={{
                              color: '#006600',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 102, 0, 0.1)',
                              },
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : (
                    <Button
                      component={page === 'Admin' ? 'button' : Link}
                      to={page !== 'Admin' ? getPageLink(page) : undefined}
                      onClick={() => {
                        if (page === 'Admin') {
                          if (isAuthenticated) {
                            logout();  // Clear authentication state
                            navigate('/admin-login');
                          } else {
                            navigate('/admin-login');
                          }
                        }
                      }}
                      sx={{ 
                        my: 2, 
                        color: '#006600', 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {page === 'Admin' && <AdminPanelSettingsIcon />}
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
