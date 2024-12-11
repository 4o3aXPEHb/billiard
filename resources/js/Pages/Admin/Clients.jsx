import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AdminPanel from "@/Pages/Admin/AdminPanel.jsx";
import {Inertia} from "@inertiajs/inertia";
import {router} from "@inertiajs/core";

const Clients = () => {
    const { clients, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [editClient, setEditClient] = useState(null);

    // Функция для отправки формы поиска
    const handleSearch = (e) => {
        e.preventDefault();
        //Inertia.get(route('admin.clients'), { search });
        router.get(route('admin.clients'),{ search })
    };

    // Функция для открытия формы редактирования
    const handleEdit = (client) => {
        setEditClient(client);
    };

    // Функция для закрытия формы редактирования
    const handleCancel = () => {
        setEditClient(null);
    };

    return (
        <AdminPanel>
            <h1>Клиенты</h1>

            {/* Форма поиска */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Поиск по имени или email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Поиск</button>
            </form>

            {/* Таблица клиентов */}
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {clients.data.map((client) => (
                    <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>
                            <button onClick={() => handleEdit(client)}>Редактировать</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Пагинация */}
            <div>
                {clients.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={link.active ? 'active' : ''}
                    />
                ))}
            </div>

            {/* Форма редактирования */}
            {editClient && (
                <div>
                    <h2>Редактировать клиента</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            Inertia.post(route('clients.update', editClient.id), {
                                name: editClient.name,
                                email: editClient.email,
                            });
                            router.reload();
                        }}
                    >
                        <div>
                            <label>Имя</label>
                            <input
                                type="text"
                                value={editClient.name}
                                onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                value={editClient.email}
                                onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
                            />
                        </div>
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={handleCancel}>
                            Отмена
                        </button>
                    </form>
                </div>
            )}
        </AdminPanel>
    );
};

export default Clients;
