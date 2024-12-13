import React, { useEffect, useState } from 'react';
import AdminPanel from '@/Pages/Admin/AdminPanel';
import ProfileAppBar from '@/Pages/Profile/ProfileAppBar.jsx';
import {usePage} from "@inertiajs/react";

const OrdersComponent = () => {
    const { orders, user } = usePage().props;

    const [activeBookings, setActiveBookings] = useState([]);
    const [completedBookings, setCompletedBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCollapsed, setActiveCollapsed] = useState(true);
    const [completedCollapsed, setCompletedCollapsed] = useState(true);
    const [allOrdersCollapsed, setAllOrdersCollapsed] = useState(true);

    useEffect(() => {
        const now = new Date();

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

    const filterBySearch = (list) => {
        if (!searchQuery) return list;
        list = list.filter(item => {
            if(item.id) {
                return item.id.toString().includes(searchQuery)
            }
            else if(item.orderId) {
                return item.orderId.toString().includes(searchQuery)
            }
        });
        return list;
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Поиск по номеру заказа"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />

            <section>
                <h2 onClick={() => setActiveCollapsed(!activeCollapsed)} style={{ cursor: 'pointer' }}>
                    {activeCollapsed ? '+' : '-'} Активные бронирования
                </h2>
                {!activeCollapsed && (
                    filterBySearch(activeBookings).length > 0 ? (
                        <ul>
                            {filterBySearch(activeBookings).map((booking, index) => (
                                <li key={index}>
                                    <p>Заказ ID: {booking.orderId}</p>
                                    <p>Стол ID: {booking.tableId}</p>
                                    <p>Время начала: {new Date(booking.timeStart).toLocaleString()}</p>
                                    <p>Время окончания: {new Date(booking.timeEnd).toLocaleString()}</p>
                                    {user.role ==='admin' ?(
                                        <a href={route('admin.orders.details', {'id': booking.orderId})}>Посмотреть детали...</a>
                                    ):(
                                        <></>
                                        //<a href={route('')}>Посмотреть детали...</a>
                                    )}
                                    <label><br /></label>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Нет активных бронирований.</p>
                    )
                )}
            </section>

            <section>
                <h2 onClick={() => setCompletedCollapsed(!completedCollapsed)} style={{ cursor: 'pointer' }}>
                    {completedCollapsed ? '+' : '-'} Завершённые бронирования
                </h2>
                {!completedCollapsed && (
                    filterBySearch(completedBookings).length > 0 ? (
                        <ul>
                            {filterBySearch(completedBookings).map((booking, index) => (
                                <li key={index}>
                                    <p>Заказ ID: {booking.orderId}</p>
                                    <p>Стол ID: {booking.tableId}</p>
                                    <p>Время начала: {new Date(booking.timeStart).toLocaleString()}</p>
                                    <p>Время окончания: {new Date(booking.timeEnd).toLocaleString()}</p>
                                    {user.role ==='admin' ?(
                                        <a href={route('admin.orders.details', {'id': booking.orderId})}>Посмотреть детали...</a>
                                    ):(
                                        <></>
                                        //<a href={route('')}>Посмотреть детали...</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Нет завершённых бронирований.</p>
                    )
                )}
            </section>

            <section>
                <h2 onClick={() => setAllOrdersCollapsed(!allOrdersCollapsed)} style={{ cursor: 'pointer' }}>
                    {allOrdersCollapsed ? '+' : '-'} Все заказы
                </h2>
                {!allOrdersCollapsed && (
                    filterBySearch(orders).length > 0 ? (
                        <ul>
                            {filterBySearch(orders).map(order => (
                                <li key={order.id}>
                                    <p>Заказ ID: {order.id}</p>
                                    {user.role === 'admin' && <p>Клиент: {order.id_user ? (
                                        <>{order.id_user}
                                        </>
                                    ) : (
                                        <>{order.client_name}
                                        </>)}
                                    </p>}
                                    <p>Сумма: {order.total_price}</p>
                                    <p>Время создания: {new Date(order.created_at).toLocaleString()}</p>
                                    <p>Статус: {order.status}</p>
                                    {user.role ==='admin' ?(
                                        <a href={route('admin.orders.details', {'id': order.id})}>Посмотреть детали...</a>
                                    ):(
                                        <></>
                                        //<a href={route('')}>Посмотреть детали...</a>
                                    )}
                                    <br/><br/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Нет заказов.</p>
                    )
                )}
            </section>
        </div>
    );
};

export default OrdersComponent;
