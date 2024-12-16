import React from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import ScienceIcon from '@mui/icons-material/Science';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PageLayout from './PageLayout';

const Facilities: React.FC = () => {
    const facilities = [
        {
            name: 'Classrooms',
            description: 'Well-maintained classrooms equipped with modern teaching aids',
            icon: <SchoolIcon sx={{ fontSize: 40 }} />
        },
        {
            name: 'Computer Laboratory',
            description: 'Modern computer labs with internet access for digital learning',
            icon: <ComputerIcon sx={{ fontSize: 40 }} />
        },
        {
            name: 'Science Laboratory',
            description: 'Fully equipped science labs for practical experiments and research',
            icon: <ScienceIcon sx={{ fontSize: 40 }} />
        },
        {
            name: 'Library',
            description: 'Comprehensive library with extensive educational resources',
            icon: <LocalLibraryIcon sx={{ fontSize: 40 }} />
        },
        {
            name: 'Sports Facilities',
            description: 'Sports grounds and equipment for physical education and athletics',
            icon: <SportsBasketballIcon sx={{ fontSize: 40 }} />
        }
    ];

    return (
        <PageLayout>
            <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography 
                    variant="h4" 
                    color="primary" 
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mb: 2 }}
                >
                    Our Facilities
                </Typography>
                
                <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Irisan National High School provides modern facilities to support our students' 
                    educational journey and ensure a conducive learning environment.
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {facilities.map((facility) => (
                        <Grid item xs={12} sm={6} md={4} key={facility.name}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        mb: 2,
                                        color: 'primary.main' 
                                    }}>
                                        {facility.icon}
                                    </Box>
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom 
                                        align="center"
                                        color="primary"
                                    >
                                        {facility.name}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary" 
                                        align="center"
                                    >
                                        {facility.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: { xs: 2, sm: 3 },
                        bgcolor: 'background.default'
                    }}
                >
                    <Typography 
                        variant="h5" 
                        color="primary"
                        gutterBottom 
                        sx={{ mb: 2 }}
                    >
                        Campus Features
                    </Typography>
                    <Typography 
                        variant="body1"
                        color="text.secondary"
                        paragraph
                    >
                        Our campus is designed to provide a safe and conducive environment for learning:
                    </Typography>
                    <Box component="ul" sx={{ pl: 4, mt: 2 }}>
                        <li>Spacious and well-ventilated classrooms</li>
                        <li>Modern laboratory facilities</li>
                        <li>Updated computer systems</li>
                        <li>Clean and well-maintained surroundings</li>
                        <li>Accessible location within Barangay Irisan</li>
                    </Box>
                </Paper>
            </Paper>
        </PageLayout>
    );
};

export default Facilities;
