import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AdminPanel from "@/Pages/Admin/AdminPanel.jsx";
import { router } from "@inertiajs/core";
import {
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

const Clients = () => {
    const { clients, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [editClient, setEditClient] = useState(null);

    // Функция для отправки формы поиска
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.clients'), { search });
    };

    // Функция для открытия формы редактирования
    const handleEdit = (client) => {
        setEditClient(client);
    };

    // Функция для закрытия формы редактирования
    const handleCancel = () => {
        setEditClient(null);
    };

    // Стили
    const tableContainerStyle = {
        backgroundColor: '#1b1b1b',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        padding: '16px',
    };

    const headerStyle = {
        marginBottom: '24px',
        color: '#FFD700',
        fontWeight: 'bold',
    };

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px',
    };

    const inputStyle = {
        backgroundColor: '#1C2538',
        color: '#FFFFFF',
        borderRadius: '4px',
        '& .MuiInputBase-input': {
            color: '#FFFFFF',
        },
        '& .MuiInputLabel-root': {
            color: '#AAAAAA',
        },
    };

    const buttonStyle = {
        backgroundColor: '#FFD700',
        color: '#2E3B55',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#E6C200',
        },
    };

    const tableCellStyle = {
        color: '#FFFFFF',
        fontWeight: 'bold',
    };

    return (
        <AdminPanel>
            <Typography variant="h4" gutterBottom sx={headerStyle}>
                Клиенты
            </Typography>

            {/* Форма поиска */}
            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                <TextField
                    variant="outlined"
                    label="Поиск по имени или email"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={inputStyle}
                />
                <Button type="submit" variant="contained" sx={buttonStyle}>
                    Поиск
                </Button>
            </Box>

            {/* Таблица клиентов */}
            <Box sx={tableContainerStyle}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={tableCellStyle}>Имя</TableCell>
                            <TableCell sx={tableCellStyle}>Email</TableCell>
                            <TableCell sx={tableCellStyle}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.data.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell sx={tableCellStyle}>{client.name}</TableCell>
                                <TableCell sx={tableCellStyle}>{client.email}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        sx={{ color: '#FFD700', borderColor: '#FFD700' }}
                                        onClick={() => handleEdit(client)}
                                    >
                                        Редактировать
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            {/* Пагинация */}
            <Box sx={paginationStyle}>
                <Pagination
                    count={clients.links.length - 2}
                    page={clients.current_page}
                    onChange={(event, page) => {
                        router.get(clients.path, { page });
                    }}
                />
            </Box>

            {/* Диалоговое окно редактирования */}
            {editClient && (
                <Dialog open={!!editClient} onClose={handleCancel}>
                    <DialogTitle>Редактировать клиента</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Имя"
                                variant="outlined"
                                value={editClient.name}
                                onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                                fullWidth
                                sx={inputStyle}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={editClient.email}
                                onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
                                fullWidth
                                sx={inputStyle}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                Inertia.post(route('clients.update', editClient.id), {
                                    name: editClient.name,
                                    email: editClient.email,
                                });
                                router.reload();
                                handleCancel();
                            }}
                            variant="contained"
                            sx={buttonStyle}
                        >
                            Сохранить
                        </Button>
                        <Button onClick={handleCancel} variant="outlined" sx={{ color: '#FFD700', borderColor: '#FFD700' }}>
                            Отмена
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </AdminPanel>
    );
};

export default Clients;
