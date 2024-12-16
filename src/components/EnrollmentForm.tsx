import React, { useState, ChangeEvent } from 'react';
import { sendEnrollmentEmail } from '../utils/emailService';
import PageLayout from './PageLayout';
import {
    Typography,
    Paper,
    Box,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stepper,
    Step,
    StepLabel,
    Alert,
    FormControlLabel,
    Checkbox,
    SelectChangeEvent
} from '@mui/material';

const EnrollmentForm: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const steps = ['Personal Information', 'Academic Details', 'Requirements'];

    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        email: '',
        phone: '',
        
        // Academic Details
        gradeLevel: '',
        strand: '',
        previousSchool: '',
        schoolYear: '',
        
        // Requirements
        form137: false,
        birthCertificate: false,
        goodMoral: false,
        pictures: false,
        parentConsent: false
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await sendEnrollmentEmail(formData);
            setSubmitted(true);
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                dateOfBirth: '',
                gender: '',
                address: '',
                email: '',
                phone: '',
                gradeLevel: '',
                strand: '',
                previousSchool: '',
                schoolYear: '',
                form137: false,
                birthCertificate: false,
                goodMoral: false,
                pictures: false,
                parentConsent: false
            });
        } catch (err) {
            setError('Failed to submit enrollment form. Please try again later.');
            console.error('Error submitting enrollment:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Middle Name"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                type="date"
                                label="Date of Birth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleSelectChange}
                                    label="Gender"
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Grade Level</InputLabel>
                                <Select
                                    name="gradeLevel"
                                    value={formData.gradeLevel}
                                    onChange={handleSelectChange}
                                    label="Grade Level"
                                >
                                    <MenuItem value="7">Grade 7</MenuItem>
                                    <MenuItem value="8">Grade 8</MenuItem>
                                    <MenuItem value="9">Grade 9</MenuItem>
                                    <MenuItem value="10">Grade 10</MenuItem>
                                    <MenuItem value="11">Grade 11</MenuItem>
                                    <MenuItem value="12">Grade 12</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Strand (for Senior High)</InputLabel>
                                <Select
                                    name="strand"
                                    value={formData.strand}
                                    onChange={handleSelectChange}
                                    label="Strand (for Senior High)"
                                >
                                    <MenuItem value="STEM">STEM</MenuItem>
                                    <MenuItem value="ABM">ABM</MenuItem>
                                    <MenuItem value="HUMSS">HUMSS</MenuItem>
                                    <MenuItem value="TVL">TVL</MenuItem>
                                    <MenuItem value="Sports">Sports</MenuItem>
                                    <MenuItem value="Arts">Arts and Design</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Previous School"
                                name="previousSchool"
                                value={formData.previousSchool}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="School Year"
                                name="schoolYear"
                                value={formData.schoolYear}
                                onChange={handleInputChange}
                                placeholder="2024-2025"
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Please confirm that you have the following requirements:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.form137}
                                        onChange={handleInputChange}
                                        name="form137"
                                    />
                                }
                                label="Form 137 (Report Card)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.birthCertificate}
                                        onChange={handleInputChange}
                                        name="birthCertificate"
                                    />
                                }
                                label="PSA Birth Certificate"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.goodMoral}
                                        onChange={handleInputChange}
                                        name="goodMoral"
                                    />
                                }
                                label="Certificate of Good Moral Character"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.pictures}
                                        onChange={handleInputChange}
                                        name="pictures"
                                    />
                                }
                                label="2x2 ID Pictures (4 pieces)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.parentConsent}
                                        onChange={handleInputChange}
                                        name="parentConsent"
                                    />
                                }
                                label="Parent's Consent Form"
                            />
                        </Grid>
                    </Grid>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <PageLayout maxWidth="md">
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom align="center" color="primary">
                        Enrollment Form
                    </Typography>
                    
                    {submitted ? (
                        <Box sx={{ mt: 4 }}>
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Your enrollment application has been submitted successfully! We will contact you soon.
                            </Alert>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}
                            <Typography paragraph>
                                Thank you for applying to Irisan National High School. We will review your application
                                and contact you through the provided contact information.
                            </Typography>
                            <Typography paragraph>
                                Please prepare all the required documents and wait for further instructions.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => window.location.href = '/'}
                            >
                                Return to Homepage
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            
                            <form onSubmit={handleSubmit}>
                                {getStepContent(activeStep)}
                                
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            {loading ? 'Submitting...' : 'Submit Application'}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </form>
                        </>
                    )}
                </Paper>
        </PageLayout>
    );
};

export default EnrollmentForm;
