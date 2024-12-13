import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import {router} from "@inertiajs/core";
import OrderInformation from "@/Components/OrderInformation.jsx";

export default function ConfirmOrderPage({ order, user }) {
    const handleStatusUpdate = (status) => {
        axios.post('/order/update-status', { id_order: order.id, status })
            .then(response =>{
                alert(`Заказ оформлен \nСтатус заказа: ${status}`)
                router.get(response.data.redirect);
            });
    };

    return (
        <div>
            <h1>Подтверждение заказа</h1>

            <OrderInformation order={order}></OrderInformation>

            <div>
                <p>Оплатить сейчас</p>
                <form>
                    <label>Номер карты:</label>
                    <input
                        type={'text'}
                        required
                    />
                    <label>CVC:</label>
                    <input
                        type={'text'}
                        required
                    />
                    <button onClick={() => handleStatusUpdate('paid')} className="btn btn-primary">
                        Оплатить
                    </button>
                </form>
                <p>Или просто забронировать</p>
                <button onClick={() => handleStatusUpdate('confirmed')} className="btn btn-secondary">
                    Подтвердить бронирование
                </button>
            </div>
        </div>
    );
}
