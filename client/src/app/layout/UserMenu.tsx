import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import type { User } from '../models/user';
import { Divider, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { History, Logout, Person } from '@mui/icons-material';
import { useLogoutMutation } from '../../features/account/accountApi';
import { Link } from 'react-router-dom';

type props = {
    user: User
}

export default function UserMenu({ user }: props) {
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit" // or "primary" or "secondary
                // sx={{
                //     fontSize: '0.875rem', // Smaller font size (MUI default is 0.9375rem for buttons)
                // }}
            >
                <Typography variant="body2" component="span">
                    {user.email}
                </Typography>
            </Button>
            <Menu
                id="fade-menu"
                slotProps={{
                    list: {
                        'aria-labelledby': 'fade-button',
                    },
                }}
                slots={{ transition: Fade }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Person></Person>
                    </ListItemIcon>
                    <ListItemText>
                        My Profile
                    </ListItemText>
                </MenuItem>
                <MenuItem component={Link} to='/orders' >
                    <ListItemIcon>
                        <History></History>
                    </ListItemIcon>
                    <ListItemText>
                        My Orders
                    </ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout></Logout>
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}