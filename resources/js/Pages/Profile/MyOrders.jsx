import React from 'react';
import { Box, Typography } from '@mui/material';
import ProfileAppBar from "@/Pages/Profile/ProfileAppBar.jsx";
import OrdersComponent from "@/Components/OrdersComponent.jsx";

const MyOrders = ({ orders, user }) => {
    return (
        <ProfileAppBar>
            <Box sx={{ padding: '20px', color: 'white' }}>
                <Typography 
                    variant="h4" 
                    sx={{ fontWeight: 'bold', marginBottom: '20px' }}
                >
                    Мои заказы
                </Typography>
                <OrdersComponent orders={orders} user={user} />
            </Box>
        </ProfileAppBar>
    );
};

export default MyOrders;
