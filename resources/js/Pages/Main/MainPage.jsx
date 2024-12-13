import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import DropDownProfile from "@/Components/DropDownProfile.jsx";
import { Link } from "@inertiajs/react";

const MainPage = ({ children, user }) => {
    const [currentTab, setCurrentTab] = useState(0);

    const tabs = [
        { label: 'Заказать', route: '/main/order' },
        { label: 'Турниры', route: '/main/tournaments' },
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

    return (
        <Box
            sx={{
                backgroundColor: '#1e1c1b',
                minHeight: '100vh',
                color: 'white',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <AppBar position="static" sx={{ backgroundColor: '#1e1c1b', boxShadow: 'none', margin: 0 }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'Comic Sans MS, sans-serif',
                                color: 'white',
                                fontWeight: 'bold',
                                backgroundColor: '#333',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                width: '170px', // Set fixed width
                                textAlign: 'center', // Center text
                                marginBottom: '5px', // Add space between the two headings
                            }}
                        >
                            Club 147
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Consolas, sans-serif',
                                color: 'white',
                                backgroundColor: '#333',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                width: '170px', // Set fixed width
                                textAlign: 'center', // Center text
                            }}
                        >
                            Бильярдный клуб
                        </Typography>
                    </Box>

                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    transition: 'transform 0.3s ease, color 0.3s ease',
                                }}
                                sx={{
                                    '&:hover': {
                                        transform: 'scale(1.1)', // Увеличиваем размер кнопки
                                        color: '#ffcc00', // Изменение цвета текста при наведении
                                    },
                                }}
                            />
                        ))}
                    </Tabs>

                    {user ? (
                        <div>
                            <DropDownProfile user={user} />
                            {user.role === 'admin' && (
                                <div style={{ marginLeft: '20px' }}>
                                    <a
                                        href="/admin"
                                        style={{
                                            color: 'white',
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = '#ffcc00')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                    >
                                        Админ панель
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link
                                href={route('login')}
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    padding: '5px 10px',
                                    border: '2px solid white',
                                    borderRadius: '5px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#ffcc00';
                                    e.target.style.color = '#1e1c1b';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = 'white';
                                }}
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    padding: '5px 10px',
                                    border: '2px solid white',
                                    borderRadius: '5px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#ffcc00';
                                    e.target.style.color = '#1e1c1b';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = 'white';
                                }}
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Box sx={{ margin: 0, padding: 0, flexGrow: 1 }}>{children}</Box>
        </Box>
    );
};

export default MainPage;
