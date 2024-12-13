import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import {router} from "@inertiajs/core";


//******************************
// принимает $order = Order::with(['user', 'admin', 'orderedTables.blockedTable'])->find($id);
//******************************
export default function OrderInformation({ order }) {
    return (
        <>
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
                <p>Имя: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
                {order.user.phone && <p>Телефон: {order.user.phone}</p>}
            </div>}
            {order.id_admin && <div>
                <p>Имя администратора: {order.admin.name}</p>
            </div>}
        </>
    )
}
