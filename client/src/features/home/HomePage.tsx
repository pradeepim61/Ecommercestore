import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box maxWidth='xl' mx='auto' px={{ xs: 2, sm: 3, md: 4 }} position='relative'>
            <Box 
                display={'flex'} 
                flexDirection={'column'} 
                alignItems='center' 
                justifyContent='center' 
                position={'relative'}
                minHeight={{ xs: '60vh', sm: '70vh', md: '80vh' }}
            >
                <img 
                    src='/images/hero1.jpg' 
                    alt='Ski resort image'
                    style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        width: '100%', 
                        height: '100%', 
                        borderRadius: '10px', 
                        objectFit: 'cover', 
                        zIndex: 0 
                    }} 
                />
                {/* Overlay for better text readability */}
                {/* <Box
                    position='absolute'
                    inset={0}
                    bgcolor='rgba(0,0,0,0.4)'
                    borderRadius='10px'
                    zIndex={1}
                    >
                    </Box> */}
                <Box 
                    display='flex' 
                    flexDirection='column' 
                    alignItems='center' 
                    p={{ xs: 4, sm: 6, md: 8 }} 
                    borderRadius={4} 
                    position='relative'
                    zIndex={2}
                    textAlign='center'
                    width={{ xs: '90%', sm: '80%', md: 'auto' }}
                >
                    <Typography 
                        variant={isMobile ? "h3" : isTablet ? "h2" : "h1"} 
                        color="white" 
                        fontWeight='bold' 
                        sx={{ 
                            my: { xs: 2, sm: 3 },
                            fontSize: {
                                xs: '2rem',
                                sm: '3rem',
                                md: '4rem',
                                lg: '4.5rem'
                            }
                        }}
                    >
                        Welcome to Ecommerce Store
                    </Typography>
                    <Button 
                        variant="contained" 
                        size={isMobile ? "medium" : "large"} 
                        component={Link} 
                        to='/catalog'
                        sx={{ 
                            mt: { xs: 4, sm: 6, md: 8 }, 
                            backgroundImage: 'linear-gradient(to right , #2563eb, #06b6d4)', 
                            fontWeight: 'bold', 
                            color: 'white', 
                            borderRadius: '16px', 
                            px: { xs: 4, sm: 6, md: 8 }, 
                            py: { xs: 1.5, sm: 2 }, 
                            border: '2px solid transparent',
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            '&:hover': {
                                backgroundImage: 'linear-gradient(to right, #1e40af, #0891b2)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Go to Shop
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}