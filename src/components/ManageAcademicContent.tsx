import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { useImportantDates } from '../context/ImportantDatesContext';
import { useAcademicPrograms } from '../context/AcademicProgramsContext';
import PageLayout from './PageLayout';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const ManageAcademicContent: React.FC = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const { dates, addDate, updateDate, deleteDate, isAuthorized: datesAuth } = useImportantDates();
    const { 
        coreSubjects, 
        tracks, 
        extraActivities, 
        addProgram, 
        updateProgram, 
        deleteProgram,
        isAuthorized: programsAuth
    } = useAcademicPrograms();

    // Dialog states
    const [dateDialogOpen, setDateDialogOpen] = useState(false);
    const [programDialogOpen, setProgramDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [programCategory, setProgramCategory] = useState<'core' | 'track' | 'extra'>('core');

    // Form states
    const [dateForm, setDateForm] = useState({
        title: '',
        date: '',
        details: ''
    });

    const [programForm, setProgramForm] = useState({
        name: '',
        description: '',
        icon: '',
        category: 'core' as 'core' | 'track' | 'extra'
    });

    if (!datesAuth || !programsAuth) {
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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Important Dates handlers
    const handleDateDialogOpen = (date?: any) => {
        if (date) {
            setDateForm({
                title: date.title,
                date: date.date,
                details: date.details
            });
            setEditingItem(date);
        } else {
            setDateForm({ title: '', date: '', details: '' });
            setEditingItem(null);
        }
        setDateDialogOpen(true);
    };

    const handleDateSubmit = () => {
        if (editingItem) {
            updateDate(editingItem.id, dateForm);
        } else {
            addDate(dateForm);
        }
        setDateDialogOpen(false);
        setDateForm({ title: '', date: '', details: '' });
        setEditingItem(null);
    };

    // Academic Programs handlers
    const handleProgramDialogOpen = (program?: any) => {
        if (program) {
            setProgramForm({
                name: program.name,
                description: program.description,
                icon: program.icon,
                category: program.category
            });
            setEditingItem(program);
        } else {
            setProgramForm({ name: '', description: '', icon: '', category: programCategory });
            setEditingItem(null);
        }
        setProgramDialogOpen(true);
    };

    const handleProgramSubmit = () => {
        if (editingItem) {
            updateProgram(editingItem.id, programForm);
        } else {
            addProgram(programForm);
        }
        setProgramDialogOpen(false);
        setProgramForm({ name: '', description: '', icon: '', category: 'core' });
        setEditingItem(null);
    };

    return (
        <PageLayout>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    mb: 3 
                }}>
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
                    <Typography variant="h5">
                        Manage Academic Content
                    </Typography>
                </Box>

                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Important Dates" />
                    <Tab label="Core Subjects" />
                    <Tab label="SHS Tracks" />
                    <Tab label="Extracurricular" />
                </Tabs>

                {/* Important Dates Panel */}
                <TabPanel value={tabValue} index={0}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleDateDialogOpen()}
                        sx={{ mb: 2 }}
                    >
                        Add Important Date
                    </Button>
                    <List>
                        {dates.map((date) => (
                            <ListItem key={date.id}>
                                <ListItemText
                                    primary={date.title}
                                    secondary={`${date.date} - ${date.details}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleDateDialogOpen(date)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteDate(date.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

                {/* Core Subjects Panel */}
                <TabPanel value={tabValue} index={1}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setProgramCategory('core');
                            handleProgramDialogOpen();
                        }}
                        sx={{ mb: 2 }}
                    >
                        Add Core Subject
                    </Button>
                    <List>
                        {coreSubjects.map((program) => (
                            <ListItem key={program.id}>
                                <ListItemText
                                    primary={program.name}
                                    secondary={program.description}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleProgramDialogOpen(program)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteProgram(program.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

                {/* SHS Tracks Panel */}
                <TabPanel value={tabValue} index={2}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setProgramCategory('track');
                            handleProgramDialogOpen();
                        }}
                        sx={{ mb: 2 }}
                    >
                        Add SHS Track
                    </Button>
                    <List>
                        {tracks.map((program) => (
                            <ListItem key={program.id}>
                                <ListItemText
                                    primary={program.name}
                                    secondary={program.description}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleProgramDialogOpen(program)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteProgram(program.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

                {/* Extracurricular Activities Panel */}
                <TabPanel value={tabValue} index={3}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setProgramCategory('extra');
                            handleProgramDialogOpen();
                        }}
                        sx={{ mb: 2 }}
                    >
                        Add Activity
                    </Button>
                    <List>
                        {extraActivities.map((program) => (
                            <ListItem key={program.id}>
                                <ListItemText
                                    primary={program.name}
                                    secondary={program.description}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleProgramDialogOpen(program)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteProgram(program.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

                {/* Important Dates Dialog */}
                <Dialog open={dateDialogOpen} onClose={() => setDateDialogOpen(false)}>
                    <DialogTitle>
                        {editingItem ? 'Edit Important Date' : 'Add Important Date'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Title"
                            value={dateForm.title}
                            onChange={(e) => setDateForm({ ...dateForm, title: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Date"
                            value={dateForm.date}
                            onChange={(e) => setDateForm({ ...dateForm, date: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Details"
                            value={dateForm.details}
                            onChange={(e) => setDateForm({ ...dateForm, details: e.target.value })}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDateDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleDateSubmit} variant="contained" color="primary">
                            {editingItem ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Academic Programs Dialog */}
                <Dialog open={programDialogOpen} onClose={() => setProgramDialogOpen(false)}>
                    <DialogTitle>
                        {editingItem ? 'Edit Program' : 'Add Program'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Name"
                            value={programForm.name}
                            onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={programForm.description}
                            onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Icon</InputLabel>
                            <Select
                                value={programForm.icon}
                                onChange={(e) => setProgramForm({ ...programForm, icon: e.target.value })}
                                label="Icon"
                            >
                                <MenuItem value="Calculate">Calculate</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="Translate">Translate</MenuItem>
                                <MenuItem value="MenuBook">Menu Book</MenuItem>
                                <MenuItem value="HistoryEdu">History</MenuItem>
                                <MenuItem value="School">School</MenuItem>
                                <MenuItem value="Build">Build</MenuItem>
                                <MenuItem value="Palette">Palette</MenuItem>
                                <MenuItem value="SportsSoccer">Sports</MenuItem>
                                <MenuItem value="AccountBalance">Account Balance</MenuItem>
                                <MenuItem value="TheaterComedy">Theater</MenuItem>
                                <MenuItem value="Groups">Groups</MenuItem>
                                <MenuItem value="VolunteerActivism">Volunteer</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setProgramDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleProgramSubmit} variant="contained" color="primary">
                            {editingItem ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </PageLayout>
    );
};

export default ManageAcademicContent;
