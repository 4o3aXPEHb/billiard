import React from 'react';
import axios from 'axios';
import OrderInformation from "@/Components/OrderInformation.jsx";

export default function ConfirmOrderPage({ order, user }) {
    const handleStatusUpdate = (status) => {
        axios.post('/order/update-status', { id_order: order.id, status })
            .then(response => {
                alert(`Заказ оформлен \nСтатус заказа: ${status}`);
                window.location.href = response.data.redirect;
            });
    };

    return (
        <div style={styles.confirmOrderPage}>
            <h1 style={styles.title}>Подтверждение заказа</h1>

            <OrderInformation order={order} />

            <div style={styles.paymentContainer}>
                <p style={styles.subtitle}>Оплатить сейчас</p>
                <form style={styles.paymentForm}>
                    <label style={styles.formLabel}>Номер карты:</label>
                    <input
                        type="text"
                        style={styles.formInput}
                        required
                    />
                    <label style={styles.formLabel}>CVC:</label>
                    <input
                        type="text"
                        style={styles.formInput}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => handleStatusUpdate('paid')}
                        style={{ ...styles.btn, ...styles.btnPrimary }}>
                        Оплатить
                    </button>
                </form>
                <p style={styles.subtitle}>Или просто забронировать</p>
                <button
                    onClick={() => handleStatusUpdate('confirmed')}
                    style={{ ...styles.btn, ...styles.btnSecondary }}>
                    Подтвердить бронирование
                </button>
            </div>
        </div>
    );
}

const styles = {
    confirmOrderPage: {
        backgroundColor: '#1B1B1B',
        color: '#8D8D8D',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        color: '#FFFFFF',
        fontSize: '24px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    subtitle: {
        color: '#8D8D8D',
        fontSize: '18px',
        margin: '10px 0',
    },
    paymentContainer: {
        backgroundColor: '#141414',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
    },
    paymentForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    formLabel: {
        color: '#FFFFFF',
        fontSize: '14px',
    },
    formInput: {
        backgroundColor: '#120909',
        color: '#FFFFFF',
        border: '1px solid #8D8D8D',
        borderRadius: '4px',
        padding: '8px',
    },
    btn: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    btnPrimary: {
        backgroundColor: '#8D8D8D',
        color: '#1B1B1B',
        transition: 'background-color 0.3s ease',
    },
    btnSecondary: {
        backgroundColor: '#141414',
        color: '#8D8D8D',
        border: '1px solid #8D8D8D',
        transition: 'background-color 0.3s ease',
    },
    btnPrimaryHover: {
        backgroundColor: '#FFFFFF',
    },
    btnSecondaryHover: {
        backgroundColor: '#8D8D8D',
        color: '#1B1B1B',
    },
};
