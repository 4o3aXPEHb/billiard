import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function OrderInformation({ order }) {
    return (
        <Box sx={{ padding: 4, backgroundColor: '#1B1B1B', color: '#FFFFFF' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF' }}>
                Информация о заказе
            </Typography>

            <Grid container spacing={4} sx={{ marginBottom: 4 }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ backgroundColor: '#2C2C2C', padding: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Детали заказа</Typography>
                        <Typography>Номер заказа: {order.id}</Typography>
                        <Typography>Статус: {order.status}</Typography>
                    </Box>
                </Grid>
                {order.id_admin && (
                    <Grid item xs={12} md={6}>
                        <Box sx={{ backgroundColor: '#2C2C2C', padding: 2, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Администратор</Typography>
                            <Typography>Имя: {order.admin.name}</Typography>
                        </Box>
                    </Grid>
                )}
                {(order.client_name || order.id_user) && (
                    <Grid item xs={12} md={6}>
                        <Box sx={{ backgroundColor: '#2C2C2C', padding: 2, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Информация о клиенте</Typography>
                            {order.client_name && (
                                <>
                                    <Typography>Имя: {order.client_name}</Typography>
                                    <Typography>Email: {order.client_email}</Typography>
                                    <Typography>Телефон: {order.client_phone}</Typography>
                                </>
                            )}
                            {order.id_user && (
                                <>
                                    <Typography>Имя: {order.user.name}</Typography>
                                    <Typography>Email: {order.user.email}</Typography>
                                    {order.user.phone && <Typography>Телефон: {order.user.phone}</Typography>}
                                </>
                            )}
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
