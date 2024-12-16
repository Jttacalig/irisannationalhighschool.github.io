import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Typography,
    Paper,
    Box,
    Button,
    Rating,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Chip,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import {
    CheckCircle as ApproveIcon,
    Block as RejectIcon,
    Delete as DeleteIcon,
    FilterList as FilterIcon
} from '@mui/icons-material';
import { useFeedback, FeedbackItem } from '../context/FeedbackContext';
import PageLayout from './PageLayout';

const ManageFeedback: React.FC = () => {
    const navigate = useNavigate();
    const { feedback, deleteFeedback, approveFeedback, isAuthorized } = useFeedback();
    const [filterType, setFilterType] = useState<'all' | 'pending' | 'approved'>('all');
    const [filterUserType, setFilterUserType] = useState<'all' | 'student' | 'parent' | 'staff'>('all');
    const [filterDialog, setFilterDialog] = useState(false);

    if (!isAuthorized) {
        return (
            <PageLayout>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        Access Denied
                    </Typography>
                    <Typography>
                        You must be authorized to access this page.
                    </Typography>
                </Paper>
            </PageLayout>
        );
    }

    const handleFilterChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        if (name === 'status') {
            setFilterType(value as 'all' | 'pending' | 'approved');
        } else if (name === 'userType') {
            setFilterUserType(value as 'all' | 'student' | 'parent' | 'staff');
        }
    };

    const filteredFeedback = feedback.filter(item => {
        const statusMatch = filterType === 'all' 
            ? true 
            : filterType === 'approved' 
                ? item.isApproved 
                : !item.isApproved;
        const userTypeMatch = filterUserType === 'all' || item.userType === filterUserType;
        return statusMatch && userTypeMatch;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <PageLayout>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton 
                            onClick={() => navigate('/admin')}
                            sx={{ 
                                color: '#006600',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 102, 0, 0.1)',
                                }
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h5" gutterBottom>
                            Manage Feedback
                        </Typography>
                    </Box>
                    <Button
                        startIcon={<FilterIcon />}
                        onClick={() => setFilterDialog(true)}
                        variant="outlined"
                    >
                        Filters
                    </Button>
                </Box>

                <List>
                    {filteredFeedback.map((item: FeedbackItem) => (
                        <ListItem
                            key={item.id}
                            sx={{
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                mb: 1,
                                bgcolor: item.isApproved ? 'action.hover' : 'background.paper'
                            }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Box>
                                        <Chip
                                            label={item.userType}
                                            size="small"
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        />
                                        <Chip
                                            label={item.category}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {formatDate(item.date)}
                                    </Typography>
                                </Box>
                                
                                <ListItemText
                                    primary={item.comment}
                                    secondary={
                                        <Rating
                                            value={item.rating}
                                            readOnly
                                            size="small"
                                            sx={{ mt: 1 }}
                                        />
                                    }
                                />
                                
                                <ListItemSecondaryAction>
                                    {!item.isApproved && (
                                        <IconButton
                                            onClick={() => approveFeedback(item.id)}
                                            color="success"
                                            title="Approve"
                                        >
                                            <ApproveIcon />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => deleteFeedback(item.id)}
                                        color="error"
                                        title="Delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </Box>
                        </ListItem>
                    ))}
                </List>

                {filteredFeedback.length === 0 && (
                    <Alert severity="info">
                        No feedback found matching the current filters.
                    </Alert>
                )}

                {/* Filter Dialog */}
                <Dialog open={filterDialog} onClose={() => setFilterDialog(false)}>
                    <DialogTitle>Filter Feedback</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={filterType}
                                onChange={handleFilterChange}
                                label="Status"
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="approved">Approved</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>User Type</InputLabel>
                            <Select
                                name="userType"
                                value={filterUserType}
                                onChange={handleFilterChange}
                                label="User Type"
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                                <MenuItem value="parent">Parent</MenuItem>
                                <MenuItem value="staff">Staff</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setFilterDialog(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </PageLayout>
    );
};

export default ManageFeedback;
