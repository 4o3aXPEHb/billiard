import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';

const ProfileAppBar = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(0);

    // Сопоставляем вкладки с маршрутами
    const tabs = [
        { label: 'Профиль', route: '/profile' },
        { label: 'Мои заказы', route: '/profile/orders' },
        {label: 'Главная', route: '/'}
    ];

    // Определяем активную вкладку на основе текущего URL
    useEffect(() => {
        const currentPath = window.location.pathname;
        const activeTabIndex = tabs.findIndex(tab => tab.route === currentPath);
        if (activeTabIndex !== -1) {
            setCurrentTab(activeTabIndex);
        }
    }, []);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
        // Inertia.get('/admin/tournaments'); //почему то не робит
        window.location.replace(tabs[newValue].route);
    };

    return (
        <Box sx={{ backgroundImage:`url('/4.jpg')` }}>
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: '#1D1D1D' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Личный кабинет
                    </Typography>
                    <Tabs value={currentTab} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
                        {tabs.map((tab, index) => (
                            <Tab key={index} label={tab.label} />
                        ))}
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 3, height: '100vh', overflowY: 'auto',}}>{children}</Box>
        </Box>
    );
    
};

export default ProfileAppBar;
