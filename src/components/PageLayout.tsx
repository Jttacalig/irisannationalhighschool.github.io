import React, { ReactNode } from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';

interface PageLayoutProps {
    children: ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    withPadding?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
    children, 
    maxWidth = 'lg',
    withPadding = true 
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ 
            minHeight: '100vh',
            pt: { xs: '100px', sm: '100px', md: '100px' }, // Significantly increased padding to prevent navbar overlap
            pb: 8,
            backgroundColor: '#f5f5f5'
        }}>
            <Container 
                maxWidth={maxWidth}
                sx={{ 
                    px: withPadding ? { xs: 2, sm: 3, md: 4 } : 0,
                }}
            >
                {children}
            </Container>
        </Box>
    );
};

export default PageLayout;
