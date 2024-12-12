import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';

const AdminPanel = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(0);

    // Сопоставляем вкладки с маршрутами
    const tabs = [
        { label: 'Клиенты', route: '/admin/clients' },
        { label: 'Турниры', route: '/admin/tournaments' },
        { label: 'Заказы', route: '/admin/orders' },
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
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Админ Панель
                    </Typography>
                    <Tabs value={currentTab} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
                        {tabs.map((tab, index) => (
                            <Tab key={index} label={tab.label} />
                        ))}
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 3 }}>{children}</Box>
        </Box>
    );
};

export default AdminPanel;
