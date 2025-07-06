import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
]

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },

]

const navStyles = { color: 'inherit', typography: 'h6', textDecoration: 'none', '&:hover': { color: 'grey.500' }, '&.active': { color: '#baedf9' } }

type Props = {
    toggleDarkMode: () => void;
    darkMode: boolean;
}

export default function NavBar({ darkMode, toggleDarkMode }: Props) {

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between',  alignItems: 'center'}}>
                <Box  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography component={NavLink} to='/' sx={navStyles} variant="h6">Re-Store</Typography>
                    <IconButton onClick={toggleDarkMode}>
                        {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
                    </IconButton>
                </Box>

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

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton size="large">
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCart ></ShoppingCart>
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

            </Toolbar>
        </AppBar>
    )
}
