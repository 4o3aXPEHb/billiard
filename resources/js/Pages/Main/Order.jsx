import React, { useState } from 'react';
import MainPage from "@/Pages/Main/MainPage.jsx";
import {usePage} from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";

const Order = () => {
    const { tables, bookedTables , user} = usePage().props;
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [clientInfo, setClientInfo] = useState({ name: '', email: '' });

    // Генерация времени с кратностью в 15 минут
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

    // Проверка, занято ли время для выбранного стола
    const isTimeBooked = (tableId, time) => {
        var isbooked = false;
        bookedTables.forEach((booking)=>{
            if(booking.id_table === tableId){
                var selectDate = new Date(selectedDate);
                var start = new Date(booking.timeStart);
                var end = new Date(booking.timeEnd);
                if(start.getDate() == selectDate.getDate() &&
                    start.getFullYear() == selectDate.getFullYear() &&
                    start.getMonth() == selectDate.getMonth() ) {
                    if(start.getHours() <= new Date(time).getHours() && end.getHours() > new Date(time).getHours()) {
                        isbooked = true;
                    }
                }
            }
        });
        return isbooked;
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
            timeStart: start,
            timeEnd: end,
            client: clientInfo,
        };

        console.log('Отправка данных:', payload);
        Inertia.post(route('main.order.post'), {
            id_table: selectedTable,
            timeStart: `${selectedDate} ${startTime}`,
            timeEnd: `${selectedDate} ${endTime}`,
            client: clientInfo,
        });
        alert('Стол успешно забронирован!');
    };

    return (
        <MainPage user = {user}>
            <h1>Бронирование стола</h1>
            <form onSubmit={handleSubmit}>
                {/* Выбор стола */}
                <div>
                    <label>Выберите стол:</label>
                    <select
                        value={selectedTable || ''}
                        onChange={(e) => setSelectedTable(Number(e.target.value))}
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
                </div>

                {/* Выбор даты */}
                <div>
                    <label>Выберите дату:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                    />
                </div>

                {/* Выбор времени начала */}
                <div>
                    <label>Время начала:</label>
                    <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        disabled={!selectedDate || !selectedTable}
                    >
                        <option value="" disabled>
                            -- Выберите --
                        </option>
                        {timeSlots.map((slot) => {
                            const timeString = slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const isBooked = selectedTable && isTimeBooked(selectedTable, slot);
                            return (
                                <option key={slot} value={timeString} disabled={isBooked}>
                                    {timeString} {isBooked ? ' (Занято)' : ''}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Выбор времени конца */}
                <div>
                    <label>Время конца:</label>
                    <select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        disabled={!startTime}
                    >
                        <option value="" disabled>
                            -- Выберите --
                        </option>
                        {timeSlots.map((slot) => {
                            const timeString = slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const isBooked = selectedTable && isTimeBooked(selectedTable, slot);
                            return (
                                <option key={slot} value={timeString} disabled={isBooked || new Date(`${selectedDate}T${timeString}`) <= new Date(`${selectedDate}T${startTime}`)}>
                                    {timeString} {isBooked ? ' (Занято)' : ''}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Поля контактной информации */}
                <div>
                    <label>Имя:</label>
                    <input
                        type="text"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        required
                    />
                </div>

                {/* Кнопка отправки */}
                <button type="submit">Забронировать</button>
            </form>
        </MainPage>
    );
};

export default Order;
