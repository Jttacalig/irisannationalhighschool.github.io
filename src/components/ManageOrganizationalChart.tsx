import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Typography,
    Box,
    Button,
    Dialog,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    Paper,
    useTheme,
    useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useOrganizationalChart, Position } from '../context/OrganizationalChartContext';
import PageLayout from './PageLayout';
import './OrganizationalChart.css';
import { getFileUrl } from '../utils/fileStorage'; // Import getFileUrl

interface PositionFormData {
    title: string;
    name: string;
    level: number;
    description: string;
    imageFile: File | null; // Change from imageUrl to imageFile
}

const positionTypes = [
    { level: 1, title: 'Principal/School Head', description: 'Overall leader of the school' },
    { level: 2, title: 'Assistant Principal', description: 'Assists in school management' },
    { level: 3, title: 'Department Head', description: 'Manages specific departments' },
    { level: 3, title: 'Guidance Counselor', description: 'Provides student support' },
    { level: 3, title: 'Special Education Coordinator', description: 'Manages special education' },
    { level: 4, title: 'Teacher', description: 'Delivers instruction' },
    { level: 4, title: 'Administrative Staff', description: 'Manages records' },
    { level: 4, title: 'Support Staff', description: 'Maintains facilities' }
];

const ManageOrganizationalChart: React.FC = () => {
    const navigate = useNavigate();
    const { positions, addPosition, updatePosition, deletePosition, loading, isAuthorized } = useOrganizationalChart();
    const [openDialog, setOpenDialog] = useState(false);
    const [editingPosition, setEditingPosition] = useState<string | null>(null);
    const [formData, setFormData] = useState<PositionFormData>({
        title: '',
        name: '',
        level: 1,
        description: '',
        imageFile: null // Initialize as null
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpenDialog = (position?: Position) => {
        if (position) {
            setEditingPosition(position.id);
            setFormData({
                title: position.title,
                name: position.name,
                level: position.level,
                description: position.description || '',
                imageFile: null // Reset imageFile when editing
            });
        } else {
            setEditingPosition(null);
            setFormData({
                title: '',
                name: '',
                level: 1,
                description: '',
                imageFile: null // Reset for new position
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingPosition(null);
        setFormData({
            title: '',
            name: '',
            level: 1,
            description: '',
            imageFile: null // Reset on close
        });
    };

    const handleSubmit = async () => {
        try {
            if (editingPosition) {
                await updatePosition(editingPosition, formData);
            } else {
                await addPosition(formData);
            }
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving position:', error);
            alert('Error saving position. Please try again.');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this position?')) {
            try {
                await deletePosition(id);
            } catch (error) {
                console.error('Error deleting position:', error);
                alert('Error deleting position. Please try again.');
            }
        }
    };

    const handlePositionTypeSelect = (positionType: typeof positionTypes[0]) => {
        setFormData(prev => ({
            ...prev,
            title: positionType.title,
            level: positionType.level,
            description: positionType.description
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            imageFile: file
        }));
    };

    // Group positions by level
    const organizedPositions = positions.reduce((acc, position) => {
        const level = position.level;
        if (!acc[level]) {
            acc[level] = [];
        }
        acc[level].push(position);
        return acc;
    }, {} as Record<number, Position[]>);

    const getBoxStyle = (level: number) => {
        switch (level) {
            case 1: return 'principal';
            case 2: return 'head-teacher';
            case 3: return 'teacher';
            default: return 'staff';
        }
    };

    return (
        <PageLayout>
            {!isAuthorized ? (
                <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, textAlign: 'center' }}>
                    <Typography variant="h6" color="error" gutterBottom>
                        Access Denied
                    </Typography>
                    <Typography variant="body1">
                        Please log in as an administrator to manage the organizational chart.
                    </Typography>
                </Paper>
            ) : (
                <>
                    <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between', 
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 2,
                            mb: 4 
                        }}>
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
                                <Typography variant={isMobile ? 'h5' : 'h4'} color="primary" fontWeight="bold">
                                    Manage Organizational Chart
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => handleOpenDialog()}
                                fullWidth={isMobile}
                            >
                                Add Position
                            </Button>
                        </Box>

                        {loading ? (
                            <Box display="flex" justifyContent="center" p={4}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box className="org-chart">
                                {Object.entries(organizedPositions)
                                    .sort(([a], [b]) => Number(a) - Number(b))
                                    .map(([level, levelPositions]) => (
                                        <div key={level} className="org-level">
                                            {levelPositions.map((position) => (
                                                <div 
                                                    key={position.id} 
                                                    className={`org-box ${getBoxStyle(Number(level))}`}
                                                >
                                                    <div className="org-title">
                                                        {position.title}
                                                    </div>
                                                    <div className="org-name">
                                                        {position.name}
                                                    </div>
                                                    {position.imageKey && (
                                                        <Box 
                                                            component="img"
                                                            src={getFileUrl(position.imageKey) || ''} // Use getFileUrl to retrieve the image URL, fallback to empty string
                                                            alt={`${position.name}'s profile`}
                                                            sx={{
                                                                width: 100,
                                                                height: 100,
                                                                borderRadius: '50%',
                                                                objectFit: 'cover',
                                                                mt: 2,
                                                                mb: 2,
                                                                border: '3px solid rgba(255, 255, 255, 0.2)'
                                                            }}
                                                        />
                                                    )}
                                                    {position.description && (
                                                        <div className="org-description">
                                                            {position.description}
                                                        </div>
                                                    )}
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'center', 
                                                        gap: 1, 
                                                        mt: 2,
                                                        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                                                        pt: 2
                                                    }}>
                                                        <Button
                                                            size="small"
                                                            startIcon={<EditIcon />}
                                                            onClick={() => handleOpenDialog(position)}
                                                            variant="outlined"
                                                            sx={{ 
                                                                color: 'white',
                                                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                                                '&:hover': {
                                                                    borderColor: 'white',
                                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                                                }
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => handleDelete(position.id)}
                                                            variant="outlined"
                                                            color="error"
                                                            sx={{ 
                                                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Box>
                                                </div>
                                            ))} 
                                        </div>
                                    ))}
                            </Box>
                        )}
                    </Paper>

                    <Dialog 
                        open={openDialog} 
                        onClose={handleCloseDialog}
                        maxWidth="sm"
                        fullWidth
                    >
                        <DialogTitle>
                            {editingPosition ? 'Edit Position' : 'Add New Position'}
                        </DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Position Type</InputLabel>
                                <Select
                                    value=""
                                    onChange={(e) => {
                                        const selected = positionTypes.find(p => p.title === e.target.value);
                                        if (selected) handlePositionTypeSelect(selected);
                                    }}
                                >
                                    {positionTypes.map((position) => (
                                        <MenuItem key={position.title} value={position.title}>
                                            {position.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                helperText="Enter the name of the person in this position"
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Description"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ marginTop: '16px' }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                {editingPosition ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </PageLayout>
    );
};

export default ManageOrganizationalChart;
