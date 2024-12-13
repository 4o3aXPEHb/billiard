import React, { useEffect, useState } from 'react';
import ProfileAppBar from "@/Pages/Profile/ProfileAppBar.jsx";
import OrdersComponent from "@/Components/OrdersComponent.jsx";

const MyOrders = ({ orders , user}) => {

    return (
        <ProfileAppBar>
            <p>Мои заказы</p>
            <OrdersComponent orders={orders} user={user}></OrdersComponent>
        </ProfileAppBar>
    );
};

export default MyOrders;
