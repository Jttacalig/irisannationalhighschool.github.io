import React from 'react';
import PageLayout from './PageLayout';
import { useImportantDates } from '../context/ImportantDatesContext';
import {
    Typography,
    Box,
    Paper,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Divider,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import {
    Description,
    Assignment,
    School,
    EventNote,
    CheckCircle,
    AccountBox,
    CalendarToday,
    AttachMoney,
    Info,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const admissionSteps = [
    {
        label: 'Submit Requirements',
        description: 'Prepare and submit all necessary documents.',
        icon: <Description />,
        content: (
            <List>
                <ListItem>
                    <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                    <ListItemText 
                        primary="Report Card (Form 138)" 
                        secondary="Original and photocopy from previous school"
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                    <ListItemText 
                        primary="Birth Certificate" 
                        secondary="PSA authenticated copy"
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                    <ListItemText 
                        primary="Good Moral Certificate" 
                        secondary="From previous school"
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                    <ListItemText 
                        primary="2x2 ID Pictures" 
                        secondary="4 pieces, recent photos"
                    />
                </ListItem>
            </List>
        )
    },
    {
        label: 'Complete Application Form',
        description: 'Fill out the online application form with accurate information.',
        icon: <Assignment />,
        content: (
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                    Complete the online application form with the following information:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><AccountBox color="primary" /></ListItemIcon>
                        <ListItemText primary="Personal Information" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><School color="primary" /></ListItemIcon>
                        <ListItemText primary="Educational Background" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Info color="primary" /></ListItemIcon>
                        <ListItemText primary="Parent/Guardian Information" />
                    </ListItem>
                </List>
                <Button
                    component={Link}
                    to="/enroll"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Go to Application Form
                </Button>
            </Box>
        )
    },
    {
        label: 'Assessment and Interview',
        description: 'Schedule and complete the assessment process.',
        icon: <School />,
        content: (
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                    After document verification, you will be scheduled for:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><EventNote color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="Academic Assessment" 
                            secondary="Basic subjects evaluation"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><EventNote color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="Student Interview" 
                            secondary="Brief discussion with guidance counselor"
                        />
                    </ListItem>
                </List>
            </Box>
        )
    },
    {
        label: 'Enrollment and Payment',
        description: 'Complete the enrollment process and settle fees.',
        icon: <EventNote />,
        content: (
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                    Upon passing the assessment:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><CalendarToday color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="Schedule Confirmation" 
                            secondary="Finalize your class schedule"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><AttachMoney color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="Fee Payment" 
                            secondary="Settle enrollment and other fees"
                        />
                    </ListItem>
                </List>
            </Box>
        )
    }
];

const Admission: React.FC = () => {
    const { dates } = useImportantDates();
    return (
        <PageLayout>
            <Typography 
                variant="h3" 
                component="h1" 
                align="center" 
                sx={{ 
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
            >
                Admission Process
            </Typography>
            <Typography 
                variant="h6" 
                align="center" 
                color="text.secondary" 
                sx={{ 
                    mb: { xs: 4, md: 6 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    maxWidth: '800px',
                    mx: 'auto'
                }}
            >
                Join our academic community and start your journey towards excellence
            </Typography>

            {/* Important Dates */}
            <Box sx={{ mb: { xs: 6, md: 8 } }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Important Dates
                </Typography>
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {dates.map((period) => (
                        <Grid item xs={12} md={4} key={period.title}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-5px)'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {period.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        {period.date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {period.details}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Admission Steps */}
            <Paper elevation={3} sx={{ 
                p: { xs: 2, sm: 3, md: 4 }, 
                mb: { xs: 6, md: 8 },
                borderRadius: 2
            }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Admission Steps
                </Typography>
                <Stepper orientation="vertical">
                    {admissionSteps.map((step, index) => (
                        <Step key={step.label} active={true}>
                            <StepLabel
                                StepIconComponent={() => (
                                    <Box component="span" sx={{ mr: 1 }}>
                                        {step.icon}
                                    </Box>
                                )}
                            >
                                <Typography variant="h6">{step.label}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {step.description}
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                {step.content}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            {/* Additional Information */}
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Additional Information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ 
                            p: { xs: 2, sm: 3 },
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}>
                            <Typography variant="h6" gutterBottom>
                                Grade Level Requirements
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <List>
                                <ListItem>
                                    <ListItemIcon><School color="primary" /></ListItemIcon>
                                    <ListItemText 
                                        primary="Junior High School (Grades 7-10)" 
                                        secondary="Must have completed elementary education"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><School color="primary" /></ListItemIcon>
                                    <ListItemText 
                                        primary="Senior High School (Grades 11-12)" 
                                        secondary="Must have completed junior high school"
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ 
                            p: { xs: 2, sm: 3 },
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}>
                            <Typography variant="h6" gutterBottom>
                                Contact Information
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Admissions Office" 
                                        secondary="For inquiries and assistance"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Email: admissions@inhs.edu.ph" 
                                        secondary="Response within 24-48 hours"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Phone: (074) 123-4567" 
                                        secondary="Monday to Friday, 8:00 AM - 5:00 PM"
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Call to Action */}
            <Box sx={{ 
                mt: { xs: 6, md: 8 }, 
                textAlign: 'center',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                gap: { xs: 2, sm: 3 }
            }}>
                    <Button
                        component={Link}
                        to="/enroll"
                        variant="contained"
                        size="large"
                        color="primary"
                        sx={{ 
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                    >
                    Apply Now
                </Button>
                    <Button
                        component={Link}
                        to="/contact"
                        variant="outlined"
                        size="large"
                        sx={{ 
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                    >
                    Contact Us
                </Button>
            </Box>
        </PageLayout>
    );
};

export default Admission;
