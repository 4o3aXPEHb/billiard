import React, { useState } from 'react';
import MainPage from "@/Pages/Main/MainPage.jsx";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import {router} from "@inertiajs/core";

const Order = () => {
    const { tables, bookedTables, user, orderStatus } = usePage().props;
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '' });

    const generateTimeSlots = () => {
        const slots = [];
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        for (let i = 0; i < 24 * 4; i++) {
            slots.push(new Date(start.getTime() + i * 15 * 60 * 1000));
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const isTimeBooked = (tableId, time) => {
        return bookedTables.some((booking) => {
            if (booking.id_table === tableId) {
                const bookingDate = new Date(booking.timeStart).toDateString();
                const timeDate = new Date(`${selectedDate}T${time}`);
                return (
                    bookingDate === timeDate.toDateString() &&
                    timeDate >= new Date(booking.timeStart) &&
                    timeDate < new Date(booking.timeEnd)
                );
            }
            return false;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTable || !selectedDate || !startTime || !endTime) {
            alert('Заполните все поля!');
            return;
        }

        const start = new Date(`${selectedDate} ${startTime}`);
        const end = new Date(`${selectedDate} ${endTime}`);

        if (end - start > 5 * 60 * 60 * 1000) {
            alert('Бронирование не может превышать 5 часов!');
            return;
        }

        const payload = {
            id_table: selectedTable,
            timeStart: `${selectedDate} ${startTime}`,
            timeEnd: `${selectedDate} ${endTime}`,
            client: clientInfo,
        };

        axios.post(route('main.order.post'), {
            id_table: selectedTable,
            timeStart: `${selectedDate} ${startTime}`,
            timeEnd: `${selectedDate} ${endTime}`,
            client: clientInfo,
        })
            .then(response => {
                if (response.data.redirect) {
                    router.get(response.data.redirect)
                }
            })
        };

    const styles = {
        container: {
            backgroundImage: `url('/4.jpg')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
        },
        textOverlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный чёрный фон
            padding: '20px',
            borderRadius: '10px',
        },
        text: {
            fontSize: '36px',
            fontWeight: 'bold',
            fontFamily: 'Gabriola, sans-serif',
            marginBottom: '20px',
        },
        button: {
            padding: '15px 30px',
            backgroundColor: '#FFD700',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '22px',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease, background-color 0.3s ease',
        },
        formContainer: {
            backgroundImage: `url('/3.jpg')`, // Фоновая картинка для блока бронирования
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            padding: '50px 0',
        },
        form: {
            padding: '20px',
            maxWidth: '600px',
            margin: '50px auto',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон
            borderRadius: '10px',
            height: '953px',
            overflowY: 'auto',
        },
        input: {
            display: 'block',
            width: '100%',
            marginBottom: '15px',
            padding: '10px',
        },
    };

    return (
        <MainPage user={user}>
            <div style={styles.container}>
                <div style={styles.textOverlay}>
                    <p style={styles.text}>
                        Девять 12-футовых столов с лузами 69-71мм<br />
                        Спортивные трансляции в высоком качестве<br />
                        Турниры с очень крутыми игроками<br />
                        Пробное занятие всего 3000р. за 2 часа!
                    </p>
                    <button
                        style={styles.button}
                        onClick={() => document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' })}
                        onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
                        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                        Забронировать
                    </button>
                </div>
            </div>

            <div id="booking-section" style={styles.formContainer}>
                <div style={styles.form}>
                    <h1 style={{ textAlign: 'center', color: 'white' }}>Бронирование стола</h1>
                    <form onSubmit={handleSubmit}>
                        <label style={{ color: 'white' }}>Выберите стол:</label>
                        <select
                            value={selectedTable || ''}
                            onChange={(e) => setSelectedTable(Number(e.target.value))}
                            style={styles.input}
                        >
                            <option value="" disabled>
                                -- Выберите --
                            </option>
                            {tables.map((table) => (
                                <option key={table.id} value={table.id}>
                                    Стол {table.id}
                                </option>
                            ))}
                        </select>

                        <label style={{ color: 'white' }}>Выберите дату:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                            style={styles.input}
                        />

                        <label style={{ color: 'white' }}>Время начала:</label>
                        <select
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            disabled={!selectedDate || !selectedTable}
                            style={styles.input}
                        >
                            <option value="" disabled>
                                -- Выберите --
                            </option>
                            {timeSlots.map((slot) => {
                                const timeString = slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                const booked = isTimeBooked(selectedTable, timeString);
                                return (
                                    <option key={timeString} value={timeString} disabled={booked}>
                                        {timeString} {booked ? '(Занято)' : ''}
                                    </option>
                                );
                            })}
                        </select>

                        <label style={{ color: 'white' }}>Время конца:</label>
                        <select
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            disabled={!startTime}
                            style={styles.input}
                        >
                            <option value="" disabled>
                                -- Выберите --
                            </option>
                            {timeSlots.map((slot) => {
                                const timeString = slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                const booked = isTimeBooked(selectedTable, timeString);
                                return (
                                    <option
                                        key={timeString}
                                        value={timeString}
                                        disabled={booked || new Date(`${selectedDate}T${timeString}`) <= new Date(`${selectedDate}T${startTime}`)}
                                    >
                                        {timeString} {booked ? '(Занято)' : ''}
                                    </option>
                                );
                            })}
                        </select>

                        <div>
                            <label style={{ color: 'white' }}>Имя:</label>
                            <input
                                type="text"
                                value={clientInfo.name}
                                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div>
                            <label style={{ color: 'white' }}>Телефон:</label>
                            <input
                                type="tel"
                                value={clientInfo.phone}
                                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                                required
                                style={styles.input}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                width: '100%',
                                marginTop: '10px',
                            }}
                            disabled={!selectedTable || !selectedDate || !startTime || !endTime}
                        >
                            Забронировать
                        </button>
                    </form>
                </div>
            </div>
        </MainPage>
    );
};

export default Order;
