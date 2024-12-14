import React, { useEffect, useState } from 'react';
import AdminPanel from '@/Pages/Admin/AdminPanel';
import { usePage } from '@inertiajs/react';

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
        return list.filter(item => {
            if (item.id) {
                return item.id.toString().includes(searchQuery);
            } else if (item.orderId) {
                return item.orderId.toString().includes(searchQuery);
            }
        });
    };

    return (
            <div style={{ padding: '16px' }}>
                <input
                    type="text"
                    placeholder="Поиск по номеру заказа"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius: '4px' }}
                />

                <div style={{ backgroundColor: '#1b1b1b', color: '#FFFFFF', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                    <h6 onClick={() => setActiveCollapsed(!activeCollapsed)} style={{ cursor: 'pointer' }}>
                        {activeCollapsed ? '►' : '▼'} Активные бронирования
                    </h6>
                    {!activeCollapsed && (
                        <div>
                            {filterBySearch(activeBookings).length > 0 ? (
                                <ul>
                                    {filterBySearch(activeBookings).map((booking, index) => (
                                        <li key={index}>
                                            <strong>Заказ ID: {booking.orderId}</strong>
                                            <div>Стол ID: {booking.tableId}</div>
                                            <div>Время начала: {new Date(booking.timeStart).toLocaleString()}</div>
                                            <div>Время окончания: {new Date(booking.timeEnd).toLocaleString()}</div>
                                            {user.role === 'admin' && (
                                                <a href={route('admin.orders.details', { id: booking.orderId })}>
                                                    Посмотреть детали
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Нет активных бронирований.</p>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ backgroundColor: '#1b1b1b', color: '#FFFFFF', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                    <h6 onClick={() => setCompletedCollapsed(!completedCollapsed)} style={{ cursor: 'pointer' }}>
                        {completedCollapsed ? '►' : '▼'} Завершённые бронирования
                    </h6>
                    {!completedCollapsed && (
                        <div>
                            {filterBySearch(completedBookings).length > 0 ? (
                                <ul>
                                    {filterBySearch(completedBookings).map((booking, index) => (
                                        <li key={index}>
                                            <strong>Заказ ID: {booking.orderId}</strong>
                                            <div>Стол ID: {booking.tableId}</div>
                                            <div>Время начала: {new Date(booking.timeStart).toLocaleString()}</div>
                                            <div>Время окончания: {new Date(booking.timeEnd).toLocaleString()}</div>
                                            {user.role === 'admin' && (
                                                <a href={route('admin.orders.details', { id: booking.orderId })}>
                                                    Посмотреть детали
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Нет завершённых бронирований.</p>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ backgroundColor: '#1b1b1b', color: '#FFFFFF', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                    <h6 onClick={() => setAllOrdersCollapsed(!allOrdersCollapsed)} style={{ cursor: 'pointer' }}>
                        {allOrdersCollapsed ? '►' : '▼'} Все заказы
                    </h6>
                    {!allOrdersCollapsed && (
                        <div>
                            {filterBySearch(orders).length > 0 ? (
                                <ul>
                                    {filterBySearch(orders).map((order) => (
                                        <li key={order.id}>
                                            <strong>Заказ ID: {order.id}</strong>
                                            <div>{user.role === 'admin' && `Клиент: ${order.id_user || order.client_name}`}</div>
                                            <div>Сумма: {order.total_price}</div>
                                            <div>Время создания: {new Date(order.created_at).toLocaleString()}</div>
                                            <div>Статус: {order.status}</div>
                                            {user.role === 'admin' && (
                                                <a href={route('admin.orders.details', { id: order.id })}>
                                                    Посмотреть детали
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Нет заказов.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
    );
};

export default OrdersComponent;
