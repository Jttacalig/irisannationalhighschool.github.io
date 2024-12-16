import React, { useState, ChangeEvent } from 'react';
import { sendContactEmail } from '../utils/emailService';
import {
    Typography,
    Box,
    Grid,
    Paper,
    TextField,
    Button,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    SelectChangeEvent
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import PageLayout from './PageLayout';

interface FormData {
    name: string;
    email: string;
    concern: string;
    otherConcern: string;
    message: string;
}

const ContactInformation = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        concern: '',
        otherConcern: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const concerns = [
        'Enrollment Inquiry',
        'Academic Programs',
        'School Requirements',
        'Transfer Student',
        'School Events',
        'Facilities',
        'Student Records',
        'Parent Concerns',
        'Community Engagement',
        'Others'
    ];

    const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const emailData = {
                name: formData.name,
                email: formData.email,
                message: `
                    Concern: ${formData.concern}
                    ${formData.concern === 'Others' ? `Specific Concern: ${formData.otherConcern}\n` : ''}
                    Message: ${formData.message}
                `
            };

            await sendContactEmail(emailData);
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                concern: '',
                otherConcern: '',
                message: ''
            });
        } catch (err) {
            setError('Failed to send message. Please try again later.');
            console.error('Error sending message:', err);
        } finally {
            setLoading(false);
        }
    };

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
                    Contact Information
                </Typography>

                <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Get in touch with us for any inquiries or concerns. We're here to help!
                </Typography>

                <Grid container spacing={4}>
                    {/* Contact Details */}
                    <Grid item xs={12} md={6}>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                p: { xs: 2, sm: 3 },
                                height: '100%',
                                bgcolor: 'background.default'
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                color="primary"
                                gutterBottom
                                sx={{ mb: 3 }}
                            >
                                School Details
                            </Typography>

                            <Box sx={{ mb: 4 }}>
                                <Typography 
                                    variant="subtitle1" 
                                    color="primary"
                                    gutterBottom
                                >
                                    Address
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <LocationOnIcon sx={{ mr: 1, mt: 0.5, color: 'primary.main' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        Barangay Irisan<br />
                                        Baguio City<br />
                                        Philippines
                                    </Typography>
                                </Box>

                                <Typography 
                                    variant="subtitle1" 
                                    color="primary"
                                    gutterBottom
                                >
                                    Region
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <PublicIcon sx={{ mr: 1, mt: 0.5, color: 'primary.main' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        Cordillera Administrative Region (CAR)
                                    </Typography>
                                </Box>

                                <Typography 
                                    variant="subtitle1" 
                                    color="primary"
                                    gutterBottom
                                >
                                    Phone
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        (074) 442 2956
                                    </Typography>
                                </Box>

                                <Typography 
                                    variant="subtitle1" 
                                    color="primary"
                                    gutterBottom
                                >
                                    Email
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        inhs305280@gmail.com
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Contact Form */}
                    <Grid item xs={12} md={6}>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                p: { xs: 2, sm: 3 },
                                height: '100%',
                                bgcolor: 'background.default'
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                color="primary"
                                gutterBottom
                                sx={{ mb: 3 }}
                            >
                                Send Us a Message
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Your Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleTextChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Your Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleTextChange}
                                    sx={{ mb: 2 }}
                                />
                                <FormControl fullWidth required sx={{ mb: 2 }}>
                                    <InputLabel>Nature of Concern</InputLabel>
                                    <Select
                                        name="concern"
                                        value={formData.concern}
                                        onChange={handleSelectChange}
                                        label="Nature of Concern"
                                    >
                                        {concerns.map((concern) => (
                                            <MenuItem key={concern} value={concern}>
                                                {concern}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Please select the nature of your concern</FormHelperText>
                                </FormControl>
                                {formData.concern === 'Others' && (
                                    <TextField
                                        required
                                        fullWidth
                                        label="Specify Your Concern"
                                        name="otherConcern"
                                        value={formData.otherConcern}
                                        onChange={handleTextChange}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                                <TextField
                                    required
                                    fullWidth
                                    label="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleTextChange}
                                    multiline
                                    rows={4}
                                    sx={{ mb: 3 }}
                                />
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        py: 1.5,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                            {submitted && (
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    Your message has been sent successfully! We'll get back to you soon.
                                </Alert>
                            )}
                            {error && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {error}
                                </Alert>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                {/* Map Section */}
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: { xs: 2, sm: 3 },
                        mt: 4,
                        bgcolor: 'background.default'
                    }}
                >
                    <Typography 
                        variant="h6" 
                        color="primary"
                        gutterBottom
                        sx={{ mb: 3 }}
                    >
                        Location Map
                    </Typography>
                    <Box
                        component="iframe"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4489.641347047933!2d120.54628691128418!3d16.429473029626713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a1f56ceefc4f%3A0xc5f61e4fcab29e3e!2sIrisan%20National%20High%20School!5e1!3m2!1sen!2sph!4v1734107036542!5m2!1sen!2sph"
                        sx={{
                            border: 0,
                            width: '100%',
                            height: 400,
                            borderRadius: 1
                        }}
                        allowFullScreen
                        loading="lazy"
                    />
                </Paper>
            </Paper>
        </PageLayout>
    );
};

export default ContactInformation;
