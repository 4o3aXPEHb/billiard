import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';

const DropDownProfile = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
            <Button
                aria-controls={open ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    backgroundColor: '#333',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    width: '105px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#ffcc00',
                        color: '#1e1c1b',
                    },
                }}
            >
                {user.name}
                
                <svg
                    className="ms-2 -me-0.5 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
                </svg>
            </Button>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#333',
                        color: 'white',
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        window.location.href = route('profile.edit');
                    }}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#ffcc00',
                            color: '#1e1c1b',
                        },
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        window.location.href = route('logout');
                    }}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#ffcc00',
                            color: '#1e1c1b',
                        },
                    }}
                >
                    Log Out
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default DropDownProfile;
