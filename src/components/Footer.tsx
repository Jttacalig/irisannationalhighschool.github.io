import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const FooterLink = styled(Link)(() => ({
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
        color: '#ffffff',
        textDecoration: 'underline'
    }
}));

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box 
            component="footer" 
            sx={{ 
                background: 'linear-gradient(135deg, #1976d2 0%, #d32f2f 100%)',
                py: 6, 
                mt: 'auto',
                color: 'white'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography 
                            variant="h6" 
                            sx={{ color: 'white', opacity: 0.9, mb: 2 }}
                        >
                            About Us
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <FooterLink to="/vision-mission">Vision & Mission</FooterLink>
                            <FooterLink to="/organizational-chart">Organizational Chart</FooterLink>
                            <FooterLink to="/history">History</FooterLink>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography 
                            variant="h6" 
                            sx={{ color: 'white', opacity: 0.9, mb: 2 }}
                        >
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <FooterLink to="/academic-programs">Academic Programs</FooterLink>
                            <FooterLink to="/facilities">Facilities</FooterLink>
                            <FooterLink to="/community-engagement">Community</FooterLink>
                            <FooterLink to="/contact">Contact Us</FooterLink>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography 
                            variant="h6" 
                            sx={{ color: 'white', opacity: 0.9, mb: 2 }}
                        >
                            Contact Info
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                            Irisan, Baguio City
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                            Email: info@inhs.edu.ph
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            Phone: (074) 123-4567
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ 
                            borderTop: 1, 
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            pt: 2,
                            mt: 2,
                            textAlign: 'center'
                        }}>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                                © {currentYear} Irisan National High School. All rights reserved.
                            </Typography>
                            <MuiLink
                                component={Link}
                                to="/privacy-policy"
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'white',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Privacy Policy
                            </MuiLink>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
