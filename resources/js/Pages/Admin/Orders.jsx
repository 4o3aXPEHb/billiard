import React, {useEffect, useState} from 'react';
import AdminPanel from './AdminPanel';
import ProfileAppBar from "@/Pages/Profile/ProfileAppBar.jsx";
import OrdersComponent from "@/Components/OrdersComponent.jsx";

const Orders = ({ orders ,user}) => {

    return (
        <AdminPanel>
            <OrdersComponent orders={orders} user={user}></OrdersComponent>
        </AdminPanel>
    );
};

export default Orders;
