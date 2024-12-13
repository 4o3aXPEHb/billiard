import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import {router} from "@inertiajs/core";

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

            <div>
                <h2>Информация о заказе</h2>
                <p>Номер заказа: {order.id}</p>
                <p>Статус: {order.status}</p>
                <h3>Заказанные столы:</h3>
                <ul>
                    {order.ordered_tables.map((table) => (
                        <li key={table.id}>
                            Стол #{table.table_number}, время: {table.time_start} - {table.time_end}
                        </li>
                    ))}
                </ul>
            </div>

            {order.client_name && <div>
                <h2>Информация о клиенте</h2>
                <p>Имя: {order.client_name}</p>
                <p>Email: {order.client_email}</p>
                <p>Телефон: {order.client_phone}</p>
            </div>}
            {order.id_user && <div>
                <h2>Информация о клиенте</h2>
                <p>Имя: {user.name}</p>
                <p>Email: {user.email}</p>
                {user.phone && <p>Телефон: {user.phone}</p>}
            </div>}
            {order.id_admin && <div>
                <p>Имя администратора: {user.name}</p>
            </div>}

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
