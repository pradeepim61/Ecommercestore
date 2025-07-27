import { DarkMode, LightMode, ShoppingCart, Menu } from "@mui/icons-material";
import { 
AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, 
Toolbar, Typography, Drawer, useMediaQuery, Theme 
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleDarkMode } from "./uiThemeMode";
import { useState } from "react";
import { useFetchBasketQuery } from "../../features/basket/basketApi";

const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
];

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },
];

const navStyles = { 
    color: 'inherit', 
    typography: 'h6', 
    textDecoration: 'none', 
    '&:hover': { color: 'grey.500' }, 
    '&.active': { color: '#baedf9' } 
};

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isLoading = useAppSelector(state => state.ui.isLoading);
    const darkMode = useAppSelector(state => state.uiThemeMode.darkMode);
    const dispatch = useAppDispatch();
    const {data: basket} = useFetchBasketQuery();
    
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center', width: 250 }}>
            <List>
                {[...midLinks, ...rightLinks].map(({ title, path }) => (
                    <ListItem 
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}
                        onClick={() => setMobileOpen(false)}
                    >
                        {title.toUpperCase()}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}>
                {/* Left Section - Brand & Dark Mode Toggle */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography component={NavLink} to='/' sx={navStyles} variant="h6">
                        Re-Store
                    </Typography>
                    <IconButton onClick={() => dispatch(toggleDarkMode())}>
                        {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
                    </IconButton>
                </Box>

                {/* Middle Links - Hidden on mobile */}
                {!isMobile && (
                    <Box>
                        <List sx={{ display: 'flex' }}>
                            {midLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

                {/* Right Section - Cart & Auth Links */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton size="large">
                            <Badge component={Link} to='/basket' badgeContent={itemCount} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>

                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

                {/* Mobile - Show cart icon */}
                {isMobile && (
                    <IconButton size="large">
                        <Badge component={Link} to='/basket' badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                )}
            </Toolbar>

            {/* Loading Indicator */}
            {isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="secondary"/>
                </Box>
            )}

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box',
                        backgroundColor: darkMode ? '#121212' : '#1976d2',
                        color: 'white'
                    },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
}