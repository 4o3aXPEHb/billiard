import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { router } from "@inertiajs/core";
import OrderInformation from "@/Components/OrderInformation.jsx";
import { Box, Button, Typography, Container } from '@mui/material';

export default function OrderDetailsPage({ order }) {
    const handleStatusUpdate = (status) => {
        axios.post('/order/update-status', { id_order: order.id, status })
            .then(response => {
                alert(`Заказ оформлен \nСтатус заказа: ${status}`);
                router.get(response.data.redirect);
            });
    };

    return (
        <Box sx={{ backgroundColor: '#2C2C2C', padding: 4, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="md" sx={{ padding: 4, backgroundColor: '#1B1B1B', borderRadius: 2, boxShadow: 3, color: '#FFFFFF' }}>
                <Typography variant="h4" gutterBottom sx={{ marginBottom: 4, textAlign: 'center', color: '#FFFFFF' }}>
                    Детали заказа
                </Typography>

                <OrderInformation order={order} />

                <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: '#ffd700', 
                            color: '#FFFFFF', 
                            '&:hover': { backgroundColor: '#333333' }, 
                            paddingX: 4, 
                            paddingY: 1, 
                            fontSize: '1rem' 
                        }}
                        onClick={() => handleStatusUpdate('confirmed')}
                    >
                        Подтвердить бронирование
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
