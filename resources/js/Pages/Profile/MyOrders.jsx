import React, { useEffect, useState } from 'react';
import ProfileAppBar from "@/Pages/Profile/ProfileAppBar.jsx";

const MyOrders = ({ orders }) => {
    const [activeBookings, setActiveBookings] = useState([]);
    const [completedBookings, setCompletedBookings] = useState([]);

    useEffect(() => {
        const now = new Date();

        // Разделение бронирований на активные и завершённые
        const active = [];
        const completed = [];


        orders.map(order => {
            if (order.ordered_tables && Array.isArray(order.ordered_tables)) {
                order.ordered_tables.forEach(orderTable => {
                    if (orderTable.blocked_table) {
                        const isCompleted = new Date(orderTable.blocked_table.timeEnd) <= now;

                        const bookingData = {
                            orderId: order.id,
                            tableId: orderTable.blocked_table.id_table,
                            timeStart: orderTable.blocked_table.timeStart,
                            timeEnd: orderTable.blocked_table.timeEnd,
                        };

                        if (isCompleted) {
                            completed.push(bookingData);
                        } else {
                            active.push(bookingData);
                        }
                        }
                });
                }
        });

        setActiveBookings(active);
        setCompletedBookings(completed);
    }, [orders]);

    return (
        <ProfileAppBar>
            <h1>Мои бронирования</h1>

            <section>
                <h2>Активные бронирования</h2>
                {activeBookings.length > 0 ? (
                    <ul>
                        {activeBookings.map((booking, index) => (
                            <li key={index}>
                                <p>Заказ ID: {booking.orderId}</p>
                                <p>Стол ID: {booking.tableId}</p>
                                <p>Время начала: {new Date(booking.timeStart).toLocaleString()}</p>
                                <p>Время окончания: {new Date(booking.timeEnd).toLocaleString()}</p>
                                <label><br></br></label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет активных бронирований.</p>
                )}
            </section>

            <section>
                <h2>Завершённые бронирования</h2>
                {completedBookings.length > 0 ? (
                    <ul>
                        {completedBookings.map((booking, index) => (
                            <li key={index}>
                                <p>Заказ ID: {booking.orderId}</p>
                                <p>Стол ID: {booking.tableId}</p>
                                <p>Время начала: {new Date(booking.timeStart).toLocaleString()}</p>
                                <p>Время окончания: {new Date(booking.timeEnd).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет завершённых бронирований.</p>
                )}
            </section>

            <section>
                <h2>Все заказы</h2>
                {orders.length > 0 ? (
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>
                                <p>Заказ ID: {order.id}</p>
                                <p>Сумма: {order.total_price}</p>
                                <p>время создания: {new Date(order.created_at).toLocaleString()}</p>
                                <p>статус: {order.status}</p>
                                <br></br>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет заказов.</p>
                )}
            </section>
        </ProfileAppBar>
    );
};

export default MyOrders;
