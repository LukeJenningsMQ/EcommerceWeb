import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import OrderCard from './OrderCard';

const OrderPage = ({uInfo}) => {

    const [Orders, setOrders] = useState([])

    const baseurl = '/api/orders?user_id=' + uInfo.id
  
  
    const fetchOrders = () => {
      axios.get(baseurl)
      .then((response) => {
        console.log("Response: ", response)
        setOrders(response.data)
      })
      .catch((error) => {
        console.error("Error fetching orders: ", error);
      });
    }
  
    useEffect(() => {
      fetchOrders()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[uInfo])
    

   
    return (
        <div className='ordersDisplay'>
         {Orders.map((order) => (<OrderCard key={order.id} order={order}/>))}
        </div>
    );

}

export default OrderPage