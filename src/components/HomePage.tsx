import React, { useMemo, memo } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    Button,
    Paper,
    styled,
    useTheme,
    alpha
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './AcademicProgramsSlider.css';
import './HeroSlider.css';
import './FeedbackSlider.css';
import { useNewsEvents } from '../context/NewsEventsContext';
import { useFeedback } from '../context/FeedbackContext';
import StarIcon from '@mui/icons-material/Star';
import * as Icons from '@mui/icons-material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8]
    }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8]
    }
}));

const CORE_SUBJECTS = [
    { id: 'math', name: 'Mathematics', icon: <Icons.Calculate className="program-icon" />, description: 'Advanced Math Skills' },
    { id: 'science', name: 'Science', icon: <Icons.Science className="program-icon" />, description: 'Scientific Discovery' },
    { id: 'english', name: 'English', icon: <Icons.Translate className="program-icon" />, description: 'Language Mastery' },
    { id: 'filipino', name: 'Filipino', icon: <Icons.MenuBook className="program-icon" />, description: 'Cultural Studies' },
    { id: 'socstud', name: 'Social Studies', icon: <Icons.HistoryEdu className="program-icon" />, description: 'Society & History' }
];

const SH_TRACKS = [
    { id: 'acad', name: 'Academic', icon: <Icons.School className="program-icon" />, description: 'University Path' },
    { id: 'tech', name: 'Tech-Voc', icon: <Icons.Build className="program-icon" />, description: 'Skills Training' },
    { id: 'arts', name: 'Arts & Design', icon: <Icons.Palette className="program-icon" />, description: 'Creative Arts' },
    { id: 'sports', name: 'Sports', icon: <Icons.SportsSoccer className="program-icon" />, description: 'Athletic Track' }
];

const QUICK_LINKS = [
    { 
        id: 'academic', 
        title: 'Programs', 
        link: '/academic-programs', 
        icon: <Icons.School sx={{ fontSize: { xs: '2rem', sm: '2.25rem' }, color: '#1565c0' }} />,
        color: '#e3f2fd',
        hoverColor: '#bbdefb'
    },
    { 
        id: 'facilities', 
        title: 'Facilities', 
        link: '/facilities', 
        icon: <Icons.Business sx={{ fontSize: { xs: '2rem', sm: '2.25rem' }, color: '#2e7d32' }} />,
        color: '#e8f5e9',
        hoverColor: '#c8e6c9'
    },
    { 
        id: 'community', 
        title: 'Community', 
        link: '/community-engagement', 
        icon: <Icons.People sx={{ fontSize: { xs: '2rem', sm: '2.25rem' }, color: '#e65100' }} />,
        color: '#fff3e0',
        hoverColor: '#ffe0b2'
    },
    { 
        id: 'contact', 
        title: 'Contact', 
        link: '/contact', 
        icon: <Icons.ContactMail sx={{ fontSize: { xs: '2rem', sm: '2.25rem' }, color: '#6a1b9a' }} />,
        color: '#f3e5f5',
        hoverColor: '#e1bee7'
    }
];

// Hero Section Component
const HeroSection = memo(() => (
    <Box className="hero-section">
        <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1920&q=80"
        >
            <source 
                src="https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89298ffb4c53a2e842bdb11546&profile_id=175&oauth2_token_id=57447761" 
                type="video/mp4" 
            />
            Your browser does not support the video tag.
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
            <div className="hero-text-container">
                <Typography 
                    className="hero-title"
                    variant="h1"
                >
                    Welcome to INHS
                </Typography>
                <Typography 
                    className="hero-subtitle"
                    variant="h4"
                >
                    Empowering minds, building futures
                </Typography>
                <Box className="enroll-button">
                    <Button 
                        to="/enroll"
                        variant="contained" 
                        size="large"
                        component={Link}
                        endIcon={<Box component="span" sx={{ ml: 1 }}>→</Box>}
                    >
                        Enroll Now
                    </Button>
                </Box>
            </div>
        </div>
    </Box>
));

// News Card Component
const NewsCard = memo(({ item }: { item: any }) => (
    <StyledCard>
        <Box component={Link} to={`/news-events?item=${item.id}&type=${item.type}`} sx={{ textDecoration: 'none', color: 'inherit', height: '100%' }}>
            {item.images?.[0] && (
                <Box
                    sx={{
                        height: 180,
                        backgroundImage: `url(${item.images[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}
            <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                <Typography variant="caption" color="primary" sx={{ mb: 1, display: 'block' }}>
                    {new Date(item.date).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1.5, fontSize: '1.1rem', fontWeight: 600 }}>
                    {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                    {item.type === 'event' 
                        ? `Venue: ${item.venue}`
                        : item.content.length > 120 
                            ? `${item.content.substring(0, 120)}...` 
                            : item.content}
                </Typography>
            </CardContent>
        </Box>
    </StyledCard>
));

// Main Component
const HomePage: React.FC = () => {
    const theme = useTheme();
    const { news, events } = useNewsEvents();
    const { feedback } = useFeedback();

    // Memoized computations
    const approvedFeedback = useMemo(() => 
        feedback
            .filter(item => item.isApproved)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 6),
        [feedback]
    );

    const combinedItems = useMemo(() => {
        const items = [
            ...news.map(item => ({
                id: item.id,
                title: item.title,
                content: item.description,
                date: item.date,
                images: item.images,
                type: 'news' as const
            })),
            ...events.map(item => ({
                id: item.id,
                title: item.title,
                content: item.venue || '',
                date: item.date,
                images: item.images,
                type: 'event' as const,
                venue: item.venue
            }))
        ];
        return items
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3);
    }, [news, events]);

    return (
        <Box>
            <HeroSection />
            
            {/* Quick Links */}
            <Box sx={{ py: { xs: 3, md: 4 }, backgroundColor: 'background.paper' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {QUICK_LINKS.map((item) => (
                            <Grid item xs={6} sm={3} key={item.id}>
                                <StyledPaper 
                                    sx={{ 
                                        p: { xs: 2, sm: 2.5 },
                                        backgroundColor: item.color,
                                        transition: 'all 0.3s ease',
                                        border: '1px solid',
                                        borderColor: 'transparent',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            backgroundColor: item.hoverColor,
                                            boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                                            borderColor: (theme) => alpha(theme.palette.primary.main, 0.1)
                                        }
                                    }}
                                >
                                    <Box 
                                        component={Link} 
                                        to={item.link}
                                        sx={{ 
                                            textDecoration: 'none',
                                            textAlign: 'center',
                                            color: 'inherit',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        {item.icon}
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={{ 
                                                fontSize: { xs: '0.95rem', sm: '1.1rem' },
                                                fontWeight: 600,
                                                color: (theme) => theme.palette.text.primary,
                                                letterSpacing: '0.01em'
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </StyledPaper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* News & Events Section */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Typography 
                        variant="h3" 
                        align="center" 
                        sx={{ 
                            mb: { xs: 3, md: 4 },
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                            fontWeight: 600
                        }}
                    >
                        Latest Updates
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {combinedItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <NewsCard item={item} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Academic Programs Section */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <Container maxWidth="lg">
                    <Typography 
                        variant="h3" 
                        align="center" 
                        sx={{ 
                            mb: { xs: 3, md: 4 },
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                            fontWeight: 600
                        }}
                    >
                        Our Programs
                    </Typography>
                    <Swiper
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        loop={true}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        className="mySwiper"
                    >
                        {[...CORE_SUBJECTS, ...SH_TRACKS].map((program) => (
                            <SwiperSlide key={program.id}>
                                <div className="program-card">
                                    <div className="program-card-content">
                                        {program.icon}
                                        <Typography className="program-title">{program.name}</Typography>
                                        <Typography className="program-description">{program.description}</Typography>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </Box>

            {/* Feedback Section */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Typography 
                        variant="h3" 
                        align="center" 
                        sx={{ 
                            mb: { xs: 3, md: 4 },
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                            fontWeight: 600
                        }}
                    >
                        Community Feedback
                    </Typography>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="feedback-swiper"
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 }
                        }}
                    >
                        {approvedFeedback.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Paper 
                                    elevation={2} 
                                    sx={{ 
                                        p: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: 'background.paper'
                                    }}
                                >
                                    <Box sx={{ mb: 2 }}>
                                        {Array.from({ length: item.rating }, (_, i) => (
                                            <StarIcon 
                                                key={i} 
                                                sx={{ 
                                                    color: 'primary.main',
                                                    fontSize: '1.2rem'
                                                }} 
                                            />
                                        ))}
                                    </Box>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            mb: 2,
                                            flexGrow: 1,
                                            fontSize: '0.95rem',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        "{item.comment}"
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(item.date).toLocaleDateString()}
                                        </Typography>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: 'primary.main',
                                                fontWeight: 500
                                            }}
                                        >
                                            {item.userType}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </Box>
        </Box>
    );
};

export default memo(HomePage);
