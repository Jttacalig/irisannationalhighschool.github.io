import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Paper,
    useTheme,
    useMediaQuery,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    CardActions,
    Zoom
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNewsEvents } from '../context/NewsEventsContext';
import PageLayout from './PageLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './NewsEventsSwiper.css';

interface DialogItem {
    type: 'news' | 'event';
    id: string;
    title: string;
    date: string;
    description?: string;
    images?: string[];
    venue?: string;
}

const NewsEvents: React.FC = () => {
    const { news, events } = useNewsEvents();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedItem, setSelectedItem] = useState<DialogItem | null>(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const itemId = params.get('item');
        const itemType = params.get('type');

        if (itemId && itemType) {
            const item = itemType === 'news' 
                ? news.find(n => n.id === itemId)
                : events.find(e => e.id === itemId);

            if (item) {
                setSelectedItem({ type: itemType as 'news' | 'event', ...item });
            }
        }
    }, [location.search, news, events]);

    const handleClose = () => {
        setSelectedItem(null);
        // Remove query parameters when closing dialog
        window.history.replaceState({}, '', window.location.pathname);
    };

    const sectionStyle = {
        p: { xs: 2, sm: 3, md: 4 },
        mb: 4
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fill, minmax(300px, 1fr))'
        },
        gap: 3
    };

    return (
        <PageLayout>
            {/* News Section */}
            <Paper sx={sectionStyle}>
                <Typography 
                    variant={isMobile ? 'h5' : 'h4'} 
                    color="primary" 
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mb: 3 }}
                >
                    Latest News
                </Typography>
                <Box sx={gridStyle}>
                    {news.map((item) => (
                        <Card 
                            key={item.id} 
                            sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                                        {item.images && item.images.length > 0 && (
                                            <Box sx={{ position: 'relative', height: 200 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={item.images[0]}
                                                    alt={item.title}
                                                    sx={{ objectFit: 'contain' }}
                                                />
                                                {item.images.length > 1 && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            right: 8,
                                                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                                                            color: 'white',
                                                            px: 1,
                                                            borderRadius: 1
                                                        }}
                                                    >
                                                        +{item.images.length - 1} more
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography 
                                    variant="subtitle2" 
                                    color="text.secondary" 
                                    gutterBottom
                                    sx={{ mb: 2 }}
                                >
                                    {new Date(item.date).toLocaleDateString()}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                <Button 
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setSelectedItem({ type: 'news', ...item })}
                                    sx={{
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            transform: 'scale(1.05)'
                                        },
                                        transition: 'all 0.2s',
                                        fontWeight: 500,
                                        px: 2
                                    }}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Paper>

            {/* Events Section */}
            <Paper sx={sectionStyle}>
                <Typography 
                    variant={isMobile ? 'h5' : 'h4'} 
                    color="primary" 
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mb: 3 }}
                >
                    Upcoming Events
                </Typography>
                <Box sx={gridStyle}>
                    {events.map((event) => (
                        <Card 
                            key={event.id} 
                            sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                                        {event.images && event.images.length > 0 && (
                                            <Box sx={{ position: 'relative', height: 200 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={event.images[0]}
                                                    alt={event.title}
                                                    sx={{ objectFit: 'contain' }}
                                                />
                                                {event.images.length > 1 && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            right: 8,
                                                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                                                            color: 'white',
                                                            px: 1,
                                                            borderRadius: 1
                                                        }}
                                                    >
                                                        +{event.images.length - 1} more
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {event.title}
                                </Typography>
                                <Typography 
                                    variant="subtitle2" 
                                    color="text.secondary" 
                                    gutterBottom
                                    sx={{ mb: 2 }}
                                >
                                    {new Date(event.date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Venue:</strong> {event.venue}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                <Button 
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setSelectedItem({ type: 'event', ...event })}
                                    sx={{
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            transform: 'scale(1.05)'
                                        },
                                        transition: 'all 0.2s',
                                        fontWeight: 500,
                                        px: 2
                                    }}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Paper>

            {/* Details Dialog */}
            <Dialog
                open={!!selectedItem}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                TransitionComponent={Zoom}
                TransitionProps={{
                    timeout: {
                        enter: 300,
                        exit: 200
                    }
                }}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease-out'
                    }
                }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(3px)',
                            transition: 'all 0.3s ease-out'
                        }
                    }
                }}
            >
                {selectedItem && (
                    <>
                        <DialogTitle sx={{ 
                            pr: 6,
                            pb: 1,
                            '& .MuiTypography-root': { 
                                fontWeight: 'bold',
                                color: 'primary.main'
                            }
                        }}>
                            {selectedItem.title}
                            <IconButton
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: 'grey.500'
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            {selectedItem.images && selectedItem.images.length > 0 && (
                                <Box sx={{ mb: 2, mt: 1 }}>
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        navigation={true}
                                        pagination={{ clickable: true }}
                                        className="news-events-swiper"
                                        style={{ borderRadius: '8px', overflow: 'hidden' }}
                                    >
                                        {selectedItem.images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        height: '400px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: '#f5f5f5'
                                                    }}
                                                >
                                                    <img 
                                                        src={image} 
                                                        alt={`${selectedItem.title} - Image ${index + 1}`}
                                                        style={{ 
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </Box>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Box>
                            )}
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                {new Date(selectedItem.date).toLocaleDateString()}
                            </Typography>
                            {selectedItem.type === 'event' && selectedItem.venue && (
                                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                                    <strong>Venue:</strong> {selectedItem.venue}
                                </Typography>
                            )}
                            {selectedItem.description && (
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                                    {selectedItem.description}
                                </Typography>
                            )}
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button 
                                onClick={handleClose}
                                variant="contained"
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    }
                                }}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </PageLayout>
    );
};

export default NewsEvents;
