import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import {router} from "@inertiajs/core";
import OrderInformation from "@/Components/OrderInformation.jsx";

export default function OrderDetailsPage({ order }) {
    const handleStatusUpdate = (status) => {
        axios.post('/order/update-status', { id_order: order.id, status })
            .then(response =>{
                alert(`Заказ оформлен \nСтатус заказа: ${status}`)
                router.get(response.data.redirect);
            });
    };

    return (
        <div>
            <OrderInformation order={order}></OrderInformation>

            <div>
                <button onClick={() => handleStatusUpdate('confirmed')} className="btn btn-secondary">
                    Подтвердить бронирование
                </button>
            </div>
        </div>
    );
}
