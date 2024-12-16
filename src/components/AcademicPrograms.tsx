import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import PageLayout from './PageLayout';
import { useAcademicPrograms } from '../context/AcademicProgramsContext';
import { School as SchoolIcon } from '@mui/icons-material';

const AcademicPrograms: React.FC = () => {
    const { coreSubjects, tracks, extraActivities } = useAcademicPrograms();

    return (
        <PageLayout>
            <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography 
                    variant="h4" 
                    color="primary" 
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mb: 4 }}
                >
                    Academic Programs
                </Typography>

                <Grid container spacing={4}>
                    {/* Core Subjects */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3 }}>
                                Core Subjects
                            </Typography>
                            <Grid container spacing={2}>
                                {coreSubjects.map((subject) => (
                                    <Grid item xs={12} sm={6} md={4} key={subject.id}>
                                        <Card>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <SchoolIcon />
                                                    <Typography variant="h6" sx={{ ml: 1 }}>{subject.name}</Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {subject.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Senior High School Tracks */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3 }}>
                                Senior High School Tracks
                            </Typography>
                            <Grid container spacing={2}>
                                {tracks.map((track) => (
                                    <Grid item xs={12} sm={6} key={track.id}>
                                        <Card>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <SchoolIcon />
                                                    <Typography variant="h6" sx={{ ml: 1 }}>{track.name}</Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {track.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Extracurricular Activities */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3 }}>
                                Extracurricular Activities
                            </Typography>
                            <Grid container spacing={2}>
                                {extraActivities.map((activity) => (
                                    <Grid item xs={12} sm={6} md={4} key={activity.id}>
                                        <Card>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <SchoolIcon />
                                                    <Typography variant="h6" sx={{ ml: 1 }}>{activity.name}</Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {activity.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </PageLayout>
    );
};

export default AcademicPrograms;
