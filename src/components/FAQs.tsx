import React from 'react';
import {
    Typography,
    Paper,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PolicyIcon from '@mui/icons-material/Policy';
import EventIcon from '@mui/icons-material/Event';
import PageLayout from './PageLayout';

const FAQs: React.FC = () => {
    const faqCategories = [
        {
            category: 'Enrollment',
            icon: <SchoolIcon />,
            questions: [
                {
                    question: 'What are the requirements for enrollment?',
                    answer: 'For new students, the basic requirements include: Form 137, Report Card from previous school, Birth Certificate, Certificate of Good Moral Character, and 2x2 ID pictures.'
                },
                {
                    question: 'When is the enrollment period?',
                    answer: 'Regular enrollment usually starts in March and ends in May. Late enrollment may be accommodated depending on slot availability.'
                },
                {
                    question: 'Do you accept transferees?',
                    answer: 'Yes, we accept transferees subject to the availability of slots and submission of complete requirements.'
                }
            ]
        },
        {
            category: 'Academic Programs',
            icon: <AssignmentIcon />,
            questions: [
                {
                    question: 'What curriculum do you follow?',
                    answer: 'We follow the K-12 curriculum prescribed by the Department of Education (DepEd).'
                },
                {
                    question: 'What tracks are offered in Senior High School?',
                    answer: 'We offer Academic, Technical-Vocational-Livelihood, Arts and Design, and Sports tracks.'
                },
                {
                    question: 'Are there extra-curricular activities?',
                    answer: 'Yes, we offer various clubs and organizations covering academics, sports, arts, and community service.'
                }
            ]
        },
        {
            category: 'School Policies',
            icon: <PolicyIcon />,
            questions: [
                {
                    question: 'What is the school uniform policy?',
                    answer: 'Students are required to wear the prescribed school uniform during regular school days. PE uniform is worn during Physical Education classes.'
                },
                {
                    question: 'What are the attendance requirements?',
                    answer: 'Students are expected to maintain at least 80% attendance rate. Absences should be properly documented with excuse letters.'
                },
                {
                    question: 'What is the grading system?',
                    answer: 'We follow the DepEd standardized grading system, with quarterly assessments and a passing grade of 75%.'
                }
            ]
        },
        {
            category: 'Events and Activities',
            icon: <EventIcon />,
            questions: [
                {
                    question: 'When are the major school events?',
                    answer: 'Major events include Foundation Day, Science Fair, Sports Festival, and Cultural Week. Dates are announced at the start of each school year.'
                },
                {
                    question: 'Are parents required to attend school activities?',
                    answer: 'Parent attendance is required for Parent-Teacher Conferences and encouraged for major school events.'
                },
                {
                    question: 'How can parents get involved in school activities?',
                    answer: 'Parents can join the Parent-Teacher Association (PTA) and participate in various school programs and events.'
                }
            ]
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
                    Frequently Asked Questions
                </Typography>

                <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Find answers to common questions about Irisan National High School's programs, 
                    policies, and procedures.
                </Typography>

                {faqCategories.map((category) => (
                    <Paper 
                        elevation={3} 
                        sx={{ mb: 4, bgcolor: 'background.default' }} 
                        key={category.category}
                    >
                        <Box sx={{ 
                            p: 2, 
                            backgroundColor: 'primary.main', 
                            color: 'white',
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4
                        }}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>{category.icon}</Grid>
                                <Grid item>
                                    <Typography variant="h6">{category.category}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        {category.questions.map((faq, index) => (
                            <Accordion 
                                key={index} 
                                elevation={0}
                                sx={{
                                    '&:before': {
                                        display: 'none',
                                    }
                                }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        backgroundColor: 'background.paper',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        }
                                    }}
                                >
                                    <Typography color="primary" fontWeight="medium">
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography color="text.secondary">
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Paper>
                ))}

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
                        Still Have Questions?
                    </Typography>
                    <Typography 
                        variant="body1"
                        color="text.secondary"
                        paragraph
                    >
                        If you couldn't find the answer to your question, please don't hesitate to:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Chip 
                                label="Contact the School Administration" 
                                color="primary" 
                                onClick={() => window.location.href = '/contact'}
                                sx={{ width: '100%', height: 40 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Chip 
                                label="Visit During Office Hours" 
                                color="secondary"
                                sx={{ width: '100%', height: 40 }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Paper>
        </PageLayout>
    );
};

export default FAQs;
