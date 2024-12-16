import React from 'react';
import {
    Typography,
    Paper,
    Box,
    Container,
    List,
    ListItem,
    ListItemText,
    Divider,
    Stack
} from '@mui/material';
import PageLayout from './PageLayout';
import schoolLogo from '../assets/inhslogo.png';
import privacyLogo from '../assets/privacy-policy.png';

const PrivacyPolicy: React.FC = () => {
    return (
        <PageLayout>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Container maxWidth="md">
                    {/* Header with Logos */}
                    <Stack 
                        direction="column" 
                        alignItems="center" 
                        spacing={3} 
                        sx={{ mb: 6 }}
                    >
                        <img 
                            src={schoolLogo} 
                            alt="Irisan National High School Logo" 
                            style={{ 
                                width: '100px', 
                                height: 'auto'
                            }} 
                        />
                        <img 
                            src={privacyLogo} 
                            alt="Privacy Policy Icon" 
                            style={{ 
                                width: '150px', 
                                height: 'auto'
                            }} 
                        />
                    </Stack>

                    {/* Introduction */}
                    <Box sx={{ mb: 4 }}>
                        <Typography paragraph>
                            At Irisan National High School, we prioritize the privacy and security of our students, parents, staff, and website visitors. This Privacy Policy outlines our practices regarding the collection, use, and protection of your personal information when you interact with our website and services. We are committed to ensuring that your privacy is respected and that your information is handled responsibly.
                        </Typography>
                    </Box>

                    {/* Information We Collect */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            Information We Collect
                        </Typography>
                        <Typography paragraph>
                            We collect various types of information to enhance your experience and improve our services:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Feedback and Surveys"
                                    secondary="We gather feedback, ratings, and comments submitted through our feedback system to understand your experiences and preferences."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="User Type Information"
                                    secondary="We identify whether you are a student, parent, or staff member when providing feedback, allowing us to tailor our responses and services accordingly."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Enrollment Information"
                                    secondary="Personal and academic information submitted through our enrollment forms is collected to facilitate the enrollment process and maintain accurate academic records."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Cookies"
                                    secondary="We use cookies to enhance basic website functionality and remember your preferences. Cookies are small data files stored on your device that help us improve your browsing experience."
                                />
                            </ListItem>
                        </List>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* How We Use Your Information */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            How We Use Your Information
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="School Improvement"
                                    secondary="Feedback collected is instrumental in enhancing our academic programs, facilities, and overall services to better meet the needs of our community."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Communication"
                                    secondary="We use your information to respond to inquiries, provide updates about school activities, and share important announcements."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Administrative Purposes"
                                    secondary="Your information is essential for processing enrollments, managing academic records, and ensuring compliance with educational regulations."
                                />
                            </ListItem>
                        </List>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* Data Protection */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            Data Protection
                        </Typography>
                        <Typography paragraph>
                            We take the protection of your personal information seriously and implement robust security measures:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Secure Storage"
                                    secondary="All data is stored securely in compliance with industry standards, with restricted access to ensure confidentiality."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Limited Access"
                                    secondary="Access to sensitive information is granted only to authorized personnel who require it for their roles."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Regular Reviews"
                                    secondary="We conduct regular reviews and updates of our security practices to adapt to new challenges and ensure the ongoing protection of your data."
                                />
                            </ListItem>
                        </List>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* Your Rights */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            Your Rights
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Access Your Data"
                                    secondary="You have the right to request access to the personal information we hold about you."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Correction"
                                    secondary="You can request the correction of any inaccurate or incomplete information."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Deletion"
                                    secondary="You may request the deletion of your personal information where applicable, in accordance with legal requirements."
                                />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Contact Information */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            Contact Us
                        </Typography>
                        <Typography paragraph>
                            If you have any questions or concerns about this Privacy Policy or our data practices, please do not hesitate to contact us:
                        </Typography>
                        <Typography paragraph>Email: privacy@irisannationalhighschool.edu.ph</Typography>
                        <Typography paragraph>Address: Irisan, Baguio City</Typography>
                        <Typography>Phone: (074) XXX-XXXX</Typography>
                    </Box>
                </Container>
            </Paper>
        </PageLayout>
    );
};

export default PrivacyPolicy;
