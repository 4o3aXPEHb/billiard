import React, { useState, useEffect } from 'react'; 
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';

const AdminPanel = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(0);

    // Tabs and routes
    const tabs = [
        { label: 'Клиенты', route: '/admin/clients' },
        { label: 'Турниры', route: '/admin/tournaments' },
        { label: 'Заказы', route: '/admin/orders' },
        { label: 'Главная', route: '/' },
    ];

    useEffect(() => {
        const currentPath = window.location.pathname;
        const activeTabIndex = tabs.findIndex(tab => tab.route === currentPath);
        if (activeTabIndex !== -1) {
            setCurrentTab(activeTabIndex);
        }
    }, []);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
        window.location.replace(tabs[newValue].route);
    };

    const appBarStyle = {
        backgroundColor: '#1B1B1B',
        boxShadow: 'none',
        borderBottom: '2px solid #444',
    };

    const tabStyle = {
        color: '#E0E0E0',
        fontWeight: 'bold',
        '&.Mui-selected': {
            color: '#FFD700',
        },
    };

    const contentStyle = {
        padding: '24px',
        backgroundColor: '#2E2E2E',
        minHeight: 'calc(100vh - 64px)',
        marginTop: '0px',
        color: '#F0F0F0',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#FFD700',
    };

    return (
        <Box>
            <AppBar position="static" sx={appBarStyle}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, ...titleStyle }}>
                        Админ панель
                    </Typography>
                    <Tabs 
                        value={currentTab} 
                        onChange={handleTabChange} 
                        textColor="inherit" 
                        indicatorColor="secondary"
                    >
                        {tabs.map((tab, index) => (
                            <Tab key={index} label={tab.label} sx={tabStyle} />
                        ))}
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Box sx={contentStyle}>{children}</Box>
        </Box>
    );
};

export default AdminPanel;
