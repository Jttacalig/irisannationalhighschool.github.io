import React, { useState, useCallback } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
    Grid,
    Paper,
    IconButton,
    Card,
    CardContent,
    Alert,
    Chip,
    Tooltip,
    CircularProgress,
    useTheme,
    Divider,
    Stack,
    styled
} from '@mui/material';
import { 
    Delete as DeleteIcon, 
    Edit as EditIcon,
    Add as AddIcon,
    Image as ImageIcon,
    Event as EventIcon,
    Newspaper as NewsIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNewsEvents } from '../context/NewsEventsContext';
import { storeFile, getFileUrl } from '../utils/fileStorage';
import PageLayout from './PageLayout';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8]
    }
}));

const ImagePreview = styled(Box)(({ theme }) => ({
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    '&:hover::before': {
        opacity: 1
    }
}));

interface PostFormData {
    title: string;
    description: string;
    date: string;
    venue?: string;
    images: File[];
}

const ManagePosts: React.FC = () => {
    const theme = useTheme();
    const { news, events, addNews, addEvent, deleteNews, deleteEvent } = useNewsEvents();
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [postType, setPostType] = useState<'news' | 'event'>('news');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<{ file: File; preview: string }[]>([]);
    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        description: '',
        date: '',
        venue: '',
        images: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const totalSize = filesArray.reduce((acc, file) => acc + file.size, 0);
            const maxSize = 10 * 1024 * 1024; // 10MB total
            
            if (totalSize > maxSize) {
                setError('Total file size exceeds 10MB limit');
                return;
            }

            // Create previews
            const newPreviews = filesArray.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));

            setSelectedImages(prev => [...prev, ...newPreviews]);
            setFormData(prev => ({ ...prev, images: [...prev.images, ...filesArray] }));
            setError(null);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (!formData.title.trim()) {
                throw new Error('Title is required');
            }

            if (postType === 'news' && !formData.description.trim()) {
                throw new Error('Description is required');
            }

            if (postType === 'event' && !formData.venue?.trim()) {
                throw new Error('Venue is required');
            }

            const processedImages: string[] = [];
            for (const image of formData.images) {
                const fileId = await storeFile(image);
                const fileUrl = getFileUrl(fileId);
                if (fileUrl) processedImages.push(fileUrl);
            }

            if (postType === 'news') {
                await addNews({
                    title: formData.title.trim(),
                    description: formData.description.trim(),
                    date: formData.date,
                    images: processedImages
                });
            } else {
                await addEvent({
                    title: formData.title.trim(),
                    venue: formData.venue?.trim() || '',
                    date: formData.date,
                    images: processedImages
                });
            }

            // Cleanup
            selectedImages.forEach(img => URL.revokeObjectURL(img.preview));
            setFormData({
                title: '',
                description: '',
                date: '',
                venue: '',
                images: []
            });
            setSelectedImages([]);
            setIsAddingPost(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to add post');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = useCallback(async (id: string, type: 'news' | 'event') => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                if (type === 'news') {
                    await deleteNews(id);
                } else {
                    await deleteEvent(id);
                }
            } catch (error) {
                setError('Failed to delete post');
            }
        }
    }, [deleteNews, deleteEvent]);

    return (
        <PageLayout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <IconButton 
                            sx={{ mr: 2 }}
                            onClick={() => window.history.back()}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" component="h1">
                            Manage Posts
                        </Typography>
                    </Box>

                    {error && (
                        <Alert 
                            severity="error" 
                            sx={{ mb: 3 }} 
                            onClose={() => setError(null)}
                        >
                            {error}
                        </Alert>
                    )}

                    {!isAddingPost ? (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setIsAddingPost(true)}
                            sx={{ mb: 4 }}
                        >
                            Add New Post
                        </Button>
                    ) : (
                        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                            <Typography variant="h5" gutterBottom color="primary">
                                {postType === 'news' ? 'Add News' : 'Add Event'}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                variant={postType === 'news' ? 'contained' : 'outlined'}
                                                onClick={() => setPostType('news')}
                                                startIcon={<NewsIcon />}
                                            >
                                                News
                                            </Button>
                                            <Button
                                                variant={postType === 'event' ? 'contained' : 'outlined'}
                                                onClick={() => setPostType('event')}
                                                startIcon={<EventIcon />}
                                            >
                                                Event
                                            </Button>
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            error={Boolean(error && error.includes('Title'))}
                                        />
                                    </Grid>

                                    {postType === 'news' ? (
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                multiline
                                                rows={4}
                                                required
                                                error={Boolean(error && error.includes('Description'))}
                                            />
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Venue"
                                                name="venue"
                                                value={formData.venue}
                                                onChange={handleInputChange}
                                                required
                                                error={Boolean(error && error.includes('Venue'))}
                                            />
                                        </Grid>
                                    )}

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Date"
                                            name="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            InputLabelProps={{ shrink: true }}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<ImageIcon />}
                                        >
                                            Upload Images
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageChange}
                                            />
                                        </Button>
                                    </Grid>

                                    {selectedImages.length > 0 && (
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Selected Images:
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {selectedImages.map((img, index) => (
                                                    <Grid item xs={6} sm={4} md={3} key={index}>
                                                        <Paper 
                                                            sx={{ 
                                                                p: 1, 
                                                                position: 'relative',
                                                                '&:hover .delete-icon': {
                                                                    opacity: 1
                                                                }
                                                            }}
                                                        >
                                                            <Box
                                                                component="img"
                                                                src={img.preview}
                                                                alt={`Preview ${index + 1}`}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 120,
                                                                    objectFit: 'cover',
                                                                    borderRadius: 1
                                                                }}
                                                            />
                                                            <IconButton
                                                                className="delete-icon"
                                                                size="small"
                                                                onClick={() => removeImage(index)}
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: 8,
                                                                    right: 8,
                                                                    bgcolor: 'rgba(0,0,0,0.5)',
                                                                    opacity: 0,
                                                                    transition: 'opacity 0.2s',
                                                                    '&:hover': {
                                                                        bgcolor: 'rgba(0,0,0,0.7)'
                                                                    }
                                                                }}
                                                            >
                                                                <DeleteIcon sx={{ color: 'white' }} />
                                                            </IconButton>
                                                        </Paper>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    )}

                                    <Grid item xs={12}>
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={loading}
                                                startIcon={loading ? <CircularProgress size={20} /> : null}
                                            >
                                                {loading ? 'Saving...' : 'Save Post'}
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    setIsAddingPost(false);
                                                    setError(null);
                                                    selectedImages.forEach(img => URL.revokeObjectURL(img.preview));
                                                    setSelectedImages([]);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    )}

                    {/* News Section */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <NewsIcon color="primary" />
                            News
                        </Typography>
                        <Grid container spacing={3}>
                            {news.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <StyledCard>
                                        {item.images?.[0] && (
                                            <ImagePreview
                                                sx={{
                                                    backgroundImage: `url(${item.images[0]})`
                                                }}
                                            />
                                        )}
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom noWrap>
                                                {item.title}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                                sx={{ mb: 2 }}
                                            >
                                                {new Date(item.date).toLocaleDateString()}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    mb: 2
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Tooltip title="Delete">
                                                    <IconButton 
                                                        onClick={() => handleDelete(item.id, 'news')}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Events Section */}
                    <Box>
                        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventIcon color="primary" />
                            Events
                        </Typography>
                        <Grid container spacing={3}>
                            {events.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <StyledCard>
                                        {item.images?.[0] && (
                                            <ImagePreview
                                                sx={{
                                                    backgroundImage: `url(${item.images[0]})`
                                                }}
                                            />
                                        )}
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom noWrap>
                                                {item.title}
                                            </Typography>
                                            <Stack spacing={1}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {new Date(item.date).toLocaleDateString()}
                                                </Typography>
                                                <Chip 
                                                    label={item.venue}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            </Stack>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                                <Tooltip title="Delete">
                                                    <IconButton 
                                                        onClick={() => handleDelete(item.id, 'event')}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </PageLayout>
    );
};

export default ManagePosts;
