import React, { useState } from 'react';
import { 
    Typography, 
    Paper, 
    Box, 
    TextField, 
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Rating,
    Alert,
    SelectChangeEvent
} from '@mui/material';
import { useFeedback, FeedbackItem } from '../context/FeedbackContext';
import PageLayout from './PageLayout';

const FeedbackForm: React.FC = () => {
    const { addFeedback } = useFeedback();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Omit<FeedbackItem, 'id' | 'date' | 'isApproved'>>({
        userType: 'student',
        category: 'Academic Programs',
        rating: 0,
        comment: ''
    });

    const categories = [
        'Academic Programs',
        'Teaching Quality',
        'School Facilities',
        'Student Services',
        'Administrative Support',
        'School Events',
        'Other'
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        if (name === 'userType') {
            setFormData(prev => ({
                ...prev,
                userType: value as 'student' | 'parent' | 'staff'
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        setFormData(prev => ({
            ...prev,
            rating: newValue || 0
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await addFeedback(formData);
            setSubmitted(true);
            setFormData({
                userType: 'student',
                category: '',
                rating: 0,
                comment: ''
            });
        } catch (err) {
            setError('Failed to submit feedback. Please try again later.');
            console.error('Error submitting feedback:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout maxWidth="md">
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center" color="primary">
                    Feedback Form
                </Typography>

                {submitted ? (
                    <Box sx={{ mt: 4 }}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Your feedback has been submitted successfully! Thank you for helping us improve.
                        </Alert>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setSubmitted(false)}
                            sx={{ mt: 2 }}
                        >
                            Submit Another Feedback
                        </Button>
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ mb: 3 }}>
                            <FormControl fullWidth required sx={{ mb: 2 }}>
                                <InputLabel>I am a</InputLabel>
                                <Select
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleSelectChange}
                                    label="I am a"
                                >
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="parent">Parent</MenuItem>
                                    <MenuItem value="staff">Staff Member</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth required sx={{ mb: 2 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleSelectChange}
                                    label="Category"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box sx={{ mb: 2 }}>
                                <Typography component="legend">Rating</Typography>
                                <Rating
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleRatingChange}
                                    size="large"
                                />
                            </Box>

                            <TextField
                                fullWidth
                                required
                                multiline
                                rows={4}
                                label="Your Feedback"
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />

                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                                sx={{ mt: 2 }}
                            >
                                {loading ? 'Submitting...' : 'Submit Feedback'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Paper>
        </PageLayout>
    );
};

export default FeedbackForm;
