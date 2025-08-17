import { DarkMode, LightMode, ShoppingCart, Menu, Home } from "@mui/icons-material";
import {
    AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem,
    Toolbar, Typography, Drawer, useMediaQuery, type Theme
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleDarkMode } from "./uiThemeMode";
import { useState } from "react";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";

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
    const {data: user} = useUserInfoQuery();
    console.log(user ? Object.values(user).join('--') : 'No user');
    const [mobileOpen, setMobileOpen] = useState(false);
    const isLoading = useAppSelector(state => state.ui.isLoading);
    const darkMode = useAppSelector(state => state.uiThemeMode.darkMode);
    const dispatch = useAppDispatch();
    const { data: basket } = useFetchBasketQuery();

    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
    console.log(itemCount);

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center', width: 250 }}>
            {user ? (
                <List>
                    {[...midLinks].map(({ title, path }) => (
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
            ) : (
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
            )}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography component={NavLink} to='/' sx={navStyles} variant="h6">
                        <IconButton>
                            <Home/>
                        </IconButton>
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

                {/* Right Section - Always show cart, conditionally show user menu or auth links */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton size="large">
                        <Badge component={Link} to='/basket' badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {user ? (
                        <UserMenu user={user} />
                    ) : !isMobile ? (
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
                    ) : null}

                </Box>
            </Toolbar>

            {/* Loading Indicator */}
            {isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="secondary" />
                </Box>
            )}

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
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